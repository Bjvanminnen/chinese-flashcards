const fs = require('fs').promises;
const { google } = require('googleapis');
const readline = require('readline');

const CRED_PATH = __dirname + '/credentials.json';
const TOKEN_PATH = __dirname + '/tokens.json';

async function authorize() {

  try {
    const creds = await loadCredentials();
    const { client_id, client_secret, redirect_uris } = creds.installed;

    const authClient = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

    let tokens = await getCachedTokens();
    if (!tokens) {
      tokens = await createTokens(authClient);
    }

    authClient.setCredentials(tokens);
    return authClient;
  } catch(err) {
    console.error(err);
  }
}

async function loadCredentials() {
  const content = await fs.readFile(CRED_PATH);
  return JSON.parse(content);
}

async function getCachedTokens() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    return JSON.parse(content);
  } catch (err) {
    return;
  }
}

async function createTokens(authClient) {
  const authUrl = authClient.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/spreadsheets']
  });
  console.log();
  console.log('Authorize this app by visiting: ', authUrl);

  const code = await promptCode();
  const { tokens } = await authClient.getToken(code);

  await persistTokens(tokens);
  return tokens;
}

 
function promptCode() {
  return new Promise(resolve => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question('Enter the code from that page: ', code => {
      rl.close();
      resolve(code);
    });
  });
}

async function persistTokens(tokens) {
  await fs.writeFile(TOKEN_PATH, JSON.stringify(tokens));
  return;
}

module.exports = authorize;
