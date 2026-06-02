function doPost(e) {
  try {
    var spreadsheetIdOrUrl = 'https://docs.google.com/spreadsheets/d/1MvNWb10UGMgIyqaw-QfW3EyC84q9hePRMKdLDXIaFbE/edit?gid=0#gid=0';
    var sheetName = 'Leads';

    var spreadsheet = getTargetSpreadsheet(spreadsheetIdOrUrl);
    var sheet = spreadsheet.getSheetByName(sheetName) || spreadsheet.insertSheet(sheetName);

    var expectedHeaders = [
      'Submitted At',
      'Email',
      'Phone',
      'WhatsApp',
      'Company',
      'Service',
      'Urgency',
      'Interested In',
      'Message',
      'Source'
    ];

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(expectedHeaders);
    } else {
      var headerRow = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
      if (headerRow.length < expectedHeaders.length) {
        var missingHeaders = expectedHeaders.slice(headerRow.length);
        sheet.getRange(1, headerRow.length + 1, 1, missingHeaders.length).setValues([missingHeaders]);
      }
    }

    var data = parsePayload(e);

    sheet.appendRow([
      data.submittedAt || new Date().toISOString(),
      data.email || '',
      data.phone || '',
      data.whatsapp || '',
      data.company || '',
      data.service || '',
      data.urgency || '',
      data.interest || '',
      data.message || '',
      data.source || 'Website'
    ]);

    return createJsonResponse({ success: true });
  } catch (error) {
    return createJsonResponse({ success: false, error: String(error) });
  }
}

function doGet() {
  return createJsonResponse({ success: true, message: 'Webhook is live' });
}

function doOptions() {
  return createJsonResponse({ success: true });
}

function createJsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function getTargetSpreadsheet(spreadsheetIdOrUrl) {
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
    company: e.parameter && e.parameter.company,
    service: e.parameter && e.parameter.service,
    urgency: e.parameter && e.parameter.urgency,
    interest: e.parameter && e.parameter.interest,
    message: e.parameter && e.parameter.message,
    source: e.parameter && e.parameter.source,
  };
}
