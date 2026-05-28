const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const yearElement = document.getElementById("year");
const submitButton = contactForm ? contactForm.querySelector('button[type="submit"]') : null;

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

if (mobileMenuToggle && mobileMenu) {
  mobileMenuToggle.addEventListener("click", () => {
    const isHidden = mobileMenu.classList.contains("hidden");
    mobileMenu.classList.toggle("hidden", !isHidden);
    mobileMenuToggle.setAttribute("aria-expanded", String(isHidden));
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      mobileMenuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const phone = String(formData.get("phone") || "").trim();
    const whatsapp = String(formData.get("whatsapp") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const interest = String(formData.get("interest") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const webhookUrl = String(contactForm.dataset.sheetWebhook || "").trim();

    if (!email || !message || !interest) {
      formStatus.textContent = "Please complete all required fields before submitting.";
      return;
    }

    if (!phone && !whatsapp) {
      formStatus.textContent = "Please provide at least a phone number or WhatsApp number.";
      return;
    }

    if (!webhookUrl) {
      formStatus.textContent = "Google Sheet is not connected yet. Add your Apps Script Web App URL in the form data-sheet-webhook attribute.";
      return;
    }

    const payload = {
      submittedAt: new Date().toISOString(),
      email,
      phone: phone || "Not provided",
      whatsapp: whatsapp || "Not provided",
      interest,
      message,
      source: "Collabit Media Website",
    };

    formStatus.textContent = "Submitting...";
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.classList.add("opacity-70", "cursor-not-allowed");
    }

    try {
      submitToGoogleSheet(webhookUrl, payload);
      formStatus.textContent = "Thanks! Your details were submitted. Please check your sheet.";
      contactForm.reset();
    } catch (error) {
      formStatus.textContent = "Submission failed. Please try again in a moment.";
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.classList.remove("opacity-70", "cursor-not-allowed");
      }
    }
  });
}

function submitToGoogleSheet(webhookUrl, payload) {
  const frameName = `sheet_submit_${Date.now()}`;
  const iframe = document.createElement("iframe");
  iframe.name = frameName;
  iframe.style.display = "none";
  document.body.appendChild(iframe);

  const tempForm = document.createElement("form");
  tempForm.method = "POST";
  tempForm.action = webhookUrl;
  tempForm.target = frameName;
  tempForm.style.display = "none";

  Object.entries(payload).forEach(([key, value]) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = String(value);
    tempForm.appendChild(input);
  });

  document.body.appendChild(tempForm);
  tempForm.submit();

  setTimeout(() => {
    tempForm.remove();
    iframe.remove();
  }, 4000);
}
