function doPost(e) {
  try {
    var spreadsheetIdOrUrl = 'https://docs.google.com/spreadsheets/d/1MvNWb10UGMgIyqaw-QfW3EyC84q9hePRMKdLDXIaFbE/edit?gid=0#gid=0';
    var sheetName = 'Leads';

    var spreadsheet = getTargetSpreadsheet(spreadsheetIdOrUrl);
    var sheet = spreadsheet.getSheetByName(sheetName) || spreadsheet.insertSheet(sheetName);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Submitted At',
        'Email',
        'Phone',
        'WhatsApp',
        'Interested In',
        'Message',
        'Source'
      ]);
    }

    var data = parsePayload(e);

    sheet.appendRow([
      data.submittedAt || new Date().toISOString(),
      data.email || '',
      data.phone || '',
      data.whatsapp || '',
      data.interest || '',
      data.message || '',
      data.source || 'Website'
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: String(error) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ success: true, message: 'Webhook is live' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getTargetSpreadsheet(spreadsheetIdOrUrl) {
  var active = SpreadsheetApp.getActiveSpreadsheet();
  if (active) {
    return active;
  }

  var spreadsheetId = extractSpreadsheetId(spreadsheetIdOrUrl);
  return SpreadsheetApp.openById(spreadsheetId);
}

function extractSpreadsheetId(value) {
  if (!value) {
    throw new Error('Spreadsheet ID is missing');
  }

  var trimmed = String(value).trim();
  var match = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  return match && match[1] ? match[1] : trimmed;
}

function parsePayload(e) {
  if (!e) {
    return {};
  }

  if (e.postData && e.postData.contents) {
    try {
      return JSON.parse(e.postData.contents);
    } catch (jsonError) {
    }
  }

  return {
    submittedAt: e.parameter && e.parameter.submittedAt,
    email: e.parameter && e.parameter.email,
    phone: e.parameter && e.parameter.phone,
    whatsapp: e.parameter && e.parameter.whatsapp,
    interest: e.parameter && e.parameter.interest,
    message: e.parameter && e.parameter.message,
    source: e.parameter && e.parameter.source,
  };
}
