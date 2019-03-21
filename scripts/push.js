const { google } = require('googleapis');
const characters = require ('../src/characters');
const authorize = require('./auth');

const SHEET_ID = '1K6u7y-Cjdkt43tzmNzgem5xJJTJNM71-SWny1CEOAJU';

async function push() {
  const auth = await authorize();
  const sheets = google.sheets({version: 'v4', auth});

  const response = await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID,
    range: 'A1',
    valueInputOption: 'RAW',
    resource: {
      values: [characters.headers].concat(characters.characters)
    }
  });
  console.log(response.data);



}
push();
