const { google } = require('googleapis');

const authorize = require('./auth');

async function push() {
  const auth = await authorize();

  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get({
    spreadsheetId: '1K6u7y-Cjdkt43tzmNzgem5xJJTJNM71-SWny1CEOAJU',
    range: 'Sheet1',
  }, (err, res) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('----');
    console.log(res);
  });
}
push();
