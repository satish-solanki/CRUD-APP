// Code.gs


const idColIndex = headers.findIndex(h => h.toString().toLowerCase() === 'id');
if (idColIndex === -1) return { success:false, message: 'ID column not found' };


// find row
let rowNumber = -1;
for (let r=1; r<values.length; r++) {
if (values[r][idColIndex] == id) { rowNumber = r+1; break; }
}
if (rowNumber === -1) return { success:false, message: 'Record not found' };


// build new row values aligned to headers
const newRow = headers.map(h => {
if (h.toString().toLowerCase() === 'id') return id;
const key = Object.keys(recordObject).find(k => k.toLowerCase() === h.toLowerCase());
return key ? recordObject[key] : '';
});


sh.getRange(rowNumber, 1, 1, newRow.length).setValues([newRow]);
return { success: true };
}


function deleteRecord(id) {
const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
const sh = ss.getSheetByName(SHEET_NAME);
const values = sh.getDataRange().getValues();
const headers = values[0];
const idColIndex = headers.findIndex(h => h.toString().toLowerCase() === 'id');
if (idColIndex === -1) return { success:false, message: 'ID column not found' };


// find row
let rowNumber = -1;
for (let r=1; r<values.length; r++) {
if (values[r][idColIndex] == id) { rowNumber = r+1; break; }
}
if (rowNumber === -1) return { success:false, message: 'Record not found' };


sh.deleteRow(rowNumber);
return { success: true };
}


// simple unique id generator
function generateUniqueId() {
return Utilities.getUuid();
}
