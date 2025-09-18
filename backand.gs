// backend-lib.gs
// (Optional helpers - you can merge into Code.gs if you like)


function ensureHeaderHasId() {
const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
const sh = ss.getSheetByName(SHEET_NAME);
const headers = sh.getRange(1,1,1,sh.getLastColumn()).getValues()[0];
if (headers[0].toString().toLowerCase() !== 'id') {
// insert ID column as first column
sh.insertColumnBefore(1);
sh.getRange(1,1).setValue('ID');


// fill IDs for existing rows
const lastRow = sh.getLastRow();
for (let r=2; r<=lastRow; r++) {
const cell = sh.getRange(r,1);
if (!cell.getValue()) cell.setValue(Utilities.getUuid());
}
}
}
