const fs = require('fs');
const { google } = require('googleapis');
const readline = require('readline');

//TODO: fs.promises

const TOKEN_PATH = 'token.json';

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

function loadCredentials() {
  return new Promise((resolve, reject) => {
    fs.readFile('credentials.json', (err, content) => {
      if (err) { reject(err); }
  
      const creds = JSON.parse(content);
      resolve(creds);
    });
  });
}

function getCachedTokens() {
  return new Promise((resolve, reject) => {
    fs.readFile(TOKEN_PATH, (err, content) => {
      if (err || !content) {
        return resolve();
      }
      resolve(JSON.parse(content));
    });
  });
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
  // const valid = await validateCode(authClient, code);
  // if (!valid) {
  //   throw new Error('invalid code');
  // }

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

/**
 * @resolves {Boolean}
 */
function validateCode(authClient, code) {
  return new Promise((resolve, reject) => {
    authClient.getToken(code, (err, token) => {
      if (err) {
        return resolve(false);
      }
      resolve(true);
    });
  });
}

function persistTokens(tokens) {
  return new Promise(resolve =>  {
    fs.writeFile(TOKEN_PATH, JSON.stringify(tokens), err => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}

module.exports = authorize;
