const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

const CREDENTIALS_PATH = path.join(__dirname, 'credentials.json');
const TOKEN_PATH = path.join(__dirname, 'token.json');

function saveToken(token) {
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(token, null, 2));
  console.log('[✓] Token saved to token.json');
}

async function authorize() {
  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
  const { client_secret, client_id, redirect_uris } = credentials.installed;

  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  let token;
  try {
    token = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'));
  } catch {
    throw new Error('❌ token.json not found. Run node get-token.js first.');
  }

  oAuth2Client.setCredentials(token);

  // 🌀 Auto-refresh and save token
  oAuth2Client.on('tokens', (tokens) => {
    if (tokens.refresh_token || tokens.access_token) {
      const updatedToken = { ...token, ...tokens };
      saveToken(updatedToken);
    }
  });

  try {
    await oAuth2Client.getAccessToken(); // refreshes token if needed
    return oAuth2Client;
  } catch (error) {
    if (
      error?.response?.data?.error === 'invalid_grant' ||
      error.message.includes('invalid_grant')
    ) {
      throw new Error(
        '❌ Your token has expired or been revoked.\n' +
        'Fix: delete token.json and run node get-token.js again.'
      );
    }
    throw new Error(`❌ Token validation failed: ${error.message}`);
  }
}

module.exports = { authorize };