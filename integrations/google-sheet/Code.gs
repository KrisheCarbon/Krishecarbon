/**
 * Receives enquiries from the KriSHE Carbon website and adds each one as a row.
 *
 * Setup (about five minutes, done once by whoever owns the sheet):
 *   1. Create a Google Sheet, e.g. "KriSHE website enquiries".
 *   2. In the sheet: Extensions > Apps Script. Delete what is there and paste this file.
 *   3. Project Settings (gear icon) > Script Properties > Add: name SECRET, value any long
 *      random text. Keep it; the website needs the same value.
 *   4. Deploy > New deployment > type "Web app". Execute as: Me. Who has access: Anyone.
 *      Deploy, approve the permission prompt, and copy the Web app URL.
 *   5. Give the website two settings (in Vercel: Project > Settings > Environment Variables):
 *        ENQUIRY_SHEET_WEBHOOK_URL = the Web app URL
 *        ENQUIRY_SHEET_SECRET      = the SECRET from step 3
 *      then redeploy the site.
 *
 * After editing this script, use Deploy > Manage deployments > Edit > New version,
 * otherwise the old version keeps running.
 */

const SHEET_NAME = 'Enquiries';

// Column heading, and the field of the enquiry that goes under it
const COLUMNS = [
  ['Received', 'receivedAt'],
  ['Role', 'role'],
  ['Name', 'name'],
  ['Organisation', 'organisation'],
  ['Email', 'email'],
  ['Phone', 'phone'],
  ['Looking for', 'interest'],
  ['Credits needed (tCO2)', 'quantity'],
  ['Preferred geography', 'geography'],
  ['Wants a site visit', 'siteVisit'],
  ['Message', 'message'],
  ['Page', 'page'],
  ['UTM source', 'utmSource'],
  ['UTM medium', 'utmMedium'],
  ['UTM campaign', 'utmCampaign'],
];

function doPost(e) {
  try {
    const enquiry = JSON.parse(e.postData.contents);

    const secret = PropertiesService.getScriptProperties().getProperty('SECRET');
    if (secret && enquiry.secret !== secret) return reply({ ok: false, error: 'Wrong secret' });

    const book = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = book.getSheetByName(SHEET_NAME) || book.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(COLUMNS.map(([heading]) => heading));
      sheet.setFrozenRows(1);
    }

    sheet.appendRow(COLUMNS.map(([, field]) => cell(enquiry[field])));
    return reply({ ok: true });
  } catch (error) {
    return reply({ ok: false, error: String(error) });
  }
}

// Text typed by a visitor must never run as a spreadsheet formula
function cell(value) {
  if (value === true) return 'Yes';
  if (value === false || value == null) return '';
  const text = String(value);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function reply(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}
