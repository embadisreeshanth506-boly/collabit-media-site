# Google Sheets Connection Setup

## 1) Create your Google Sheet
- Create a new Google Sheet.
- Copy the Spreadsheet ID from the URL:
  - `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`

## 2) Add Apps Script backend
- In Google Sheet: Extensions > Apps Script.
- Replace code with content from [google-apps-script.gs](google-apps-script.gs).
- Set `spreadsheetIdOrUrl` with your Spreadsheet ID or full Sheet URL.
- Save project.
- In Apps Script editor, run any function once (for example `doGet`) and click Allow to grant permissions.

## 3) Deploy Web App
- Click Deploy > New deployment.
- Select type: Web app.
- Execute as: Me.
- Who has access: Anyone.
- Deploy and copy the Web App URL.
- If you changed code later, click Deploy > Manage deployments > Edit (pencil) > New version > Deploy.
- Ensure you are deploying from the same Google account that owns or can edit the target Sheet.

## 4) Connect website form
- Open [index.html](index.html).
- Find the contact form tag:
  - `<form id="contact-form" data-sheet-webhook="" ...>`
- Paste your Web App URL inside `data-sheet-webhook`.

Example:
- `data-sheet-webhook="https://script.google.com/macros/s/XXXXXXXXXXXX/exec"`

## 5) Test
- Open website and submit contact form.
- Verify new row appears in `Leads` sheet.
