const fs = require('fs').promises;
const { google } = require('googleapis');
const authorize = require('./auth');

const SHEET_ID = '1K6u7y-Cjdkt43tzmNzgem5xJJTJNM71-SWny1CEOAJU';
const CHAR_PATH = __dirname + '/../src/characters.json';

async function pull() {
  const auth = await authorize();
  const sheets = google.sheets({version: 'v4', auth});

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: 'Sheet1',
  });
  const [headers, ...characters] = response.data.values;

  const data = {
    headers,
    characters
  };
  await fs.writeFile(CHAR_PATH, customStringify(data));
  console.log('Updated characters.json');
}
pull();

function customStringify(data) {
  const arrayStr = rg => `[${rg.map(text => `"${text}"`).join(', ')}]`;

  return `
{
  "headers": ${arrayStr(data.headers)},
  "characters": [
    ${data.characters.map(row => arrayStr(row)).join(',\n    ')}
  ]
}`;
}
