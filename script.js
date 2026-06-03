// Google Ads conversion settings - replace with your real values
// `GOOGLE_ADS_SEND_TO` should be the full send_to string from Google Ads, e.g. "AW-123456789/AbCdEfGhIjKlMnop_qrs"
// If you only have an AW ID (AW-123456789) you can put it in GOOGLE_ADS_CONVERSION_ID, but `send_to` is recommended.
const GOOGLE_ADS_SEND_TO = "G-2RR8RMMS00/call"; // TODO: replace with your conversion send_to
const GOOGLE_ADS_CONVERSION_ID = "G-2RR8RMMS00"; // optional, replace with your AW ID

const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const yearElement = document.getElementById("year");
const submitButton = contactForm ? contactForm.querySelector('button[type="submit"]') : null;
const consultationModal = document.getElementById("consultation-modal");
const consultationClose = document.getElementById("consultation-close");
const consultationForm = document.getElementById("consultation-form");
const consultationFormStatus = document.getElementById("consultation-form-status");
const consultationSubmitButton = consultationForm ? consultationForm.querySelector('button[type="submit"]') : null;
const openConsultationButtons = document.querySelectorAll("[data-open-consultation]");
const footerCallLink = document.getElementById("footer-call-link");
const footerWhatsappLink = document.getElementById("footer-whatsapp-link");

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

const openConsultationModal = () => {
  if (consultationModal) {
    consultationModal.classList.remove("hidden");
    consultationModal.classList.add("flex");
  }
};

const closeConsultationModal = () => {
  if (consultationModal) {
    consultationModal.classList.remove("flex");
    consultationModal.classList.add("hidden");
  }
};

openConsultationButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    openConsultationModal();
  });
});

if (consultationClose) {
  consultationClose.addEventListener("click", closeConsultationModal);
}

if (consultationModal) {
  consultationModal.addEventListener("click", (event) => {
    if (event.target === consultationModal) {
      closeConsultationModal();
    }
  });
}

const handleFormSubmit = async (form, statusElement, submitBtn) => {
  const formData = new FormData(form);
  const phone = String(formData.get("phone") || "").trim();
  const whatsapp = String(formData.get("whatsapp") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const company = String(formData.get("company") || "").trim();
  const service = String(formData.get("service") || "").trim();
  const urgency = String(formData.get("urgency") || "").trim();
  const interest = String(formData.get("interest") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const webhookUrl = String(form.dataset.sheetWebhook || "").trim();

  if (!email || !message || !interest || !service || !urgency) {
    statusElement.textContent = "Please complete all required fields before submitting.";
    return;
  }

  if (!phone && !whatsapp) {
    statusElement.textContent = "Please provide at least a phone number or WhatsApp number.";
    return;
  }

  if (!webhookUrl) {
    statusElement.textContent = "Google Sheet is not connected yet. Add your Apps Script Web App URL in the form data-sheet-webhook attribute.";
    return;
  }

  trackFormSubmission(form);
  statusElement.textContent = "Submitting...";
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.classList.add("opacity-70", "cursor-not-allowed");
  }

  try {
    await submitToGoogleSheet(webhookUrl, formData);
    statusElement.textContent = "Thanks! Your details were submitted. Please check your sheet.";
    form.reset();
    if (form === consultationForm) {
      setTimeout(closeConsultationModal, 1000);
    }
  } catch (error) {
    console.error(error);
    statusElement.textContent = "Submission failed. Please try again in a moment.";
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.classList.remove("opacity-70", "cursor-not-allowed");
    }
  }
};

if (consultationForm && consultationFormStatus) {
  consultationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    handleFormSubmit(consultationForm, consultationFormStatus, consultationSubmitButton);
  });
}

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    handleFormSubmit(contactForm, formStatus, submitButton);
  });
}

function trackFormSubmission(form) {
  const formId = form.id || "unknown_form";
  const formName = form.querySelector('input[name="form_name"]')?.value || formId;
  const action = "Form Submission";
  const label = formName;

  if (window.gtag) {
    gtag("event", action, {
      event_category: "Form",
      event_label: label,
      transport_type: "beacon",
    });
  } else if (window.dataLayer) {
    window.dataLayer.push({
      event: "form_submission",
      event_category: "Form",
      event_action: action,
      event_label: label,
    });
  }
}

function attachFooterContactButtons() {
  if (footerWhatsappLink) {
    footerWhatsappLink.addEventListener("click", (event) => {
      trackContactButtonClick(event, "Contact", "WhatsApp Click", "Footer WhatsApp", footerWhatsappLink.href, "_blank");
    });
  }

  if (footerCallLink) {
    footerCallLink.addEventListener("click", (event) => {
      trackContactButtonClick(event, "Contact", "Call Click", "Footer Call", footerCallLink.href, "_self");
    });
  }
}

attachFooterContactButtons();

async function submitToGoogleSheet(webhookUrl, formData) {
  const response = await fetch(webhookUrl, {
    method: "POST",
    body: new URLSearchParams(formData),
  });

  if (!response.ok) {
    throw new Error(`Network request failed: ${response.status}`);
  }

  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch (error) {
    throw new Error("Invalid response from webhook.");
  }

  if (!data.success) {
    throw new Error(data.error || "Webhook rejected the form submission.");
  }

  return data;
}

function trackContactButtonClick(event, category, action, label, url, target) {
  event.preventDefault();

  const navigate = () => {
    if (target === "_blank") {
      window.open(url, target);
    } else {
      window.location.href = url;
    }
  };

  const fallback = setTimeout(navigate, 300);

  // For call clicks, send Google Ads conversion event (if configured)
  const isCallAction = /call/i.test(action) || /call/i.test(label) || url?.startsWith("tel:");

  if (isCallAction && window.gtag && typeof GOOGLE_ADS_SEND_TO === "string" && GOOGLE_ADS_SEND_TO.includes("AW-")) {
    // Send Google Ads conversion first, then navigate from callback
    gtag("event", "conversion", {
      send_to: GOOGLE_ADS_SEND_TO,
      value: 1.0,
      currency: "INR",
      event_callback: () => {
        clearTimeout(fallback);
        // Also send the generic analytics event (optional)
        try { gtag("event", action, { event_category: category, event_label: label, transport_type: "beacon" }); } catch (e) {}
        navigate();
      },
    });
  } else if (window.gtag) {
    // No Ads conversion configured — send generic analytics event then navigate
    gtag("event", action, {
      event_category: category,
      event_label: label,
      transport_type: "beacon",
      event_callback: () => {
        clearTimeout(fallback);
        navigate();
      },
    });
  } else if (window.dataLayer) {
    window.dataLayer.push({
      event: "contact_click",
      event_category: category,
      event_action: action,
      event_label: label,
    });
    navigate();
  } else {
    navigate();
  }
}

function attachFloatingContactButtons() {
  const whatsappButton = document.getElementById("whatsapp-button");
  const callButton = document.getElementById("call-button");

  if (whatsappButton) {
    whatsappButton.addEventListener("click", (event) => {
      trackContactButtonClick(event, "Contact", "WhatsApp Click", "Floating WhatsApp", whatsappButton.href, "_blank");
    });
  }

  if (callButton) {
    callButton.addEventListener("click", (event) => {
      trackContactButtonClick(event, "Contact", "Call Click", "Floating Call", callButton.href, "_self");
    });
  }
}

attachFloatingContactButtons();
