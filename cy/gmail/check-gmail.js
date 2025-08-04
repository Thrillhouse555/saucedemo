const { google } = require('googleapis');
const { authorize } = require('./authorize');

async function checkGmail({ query, maxResults = 1 }) {
  const auth = await authorize();
  const gmail = google.gmail({ version: 'v1', auth });

  const res = await gmail.users.messages.list({
    userId: 'me',
    q: query,
    maxResults
  });

  const messages = res.data.messages || [];
  if (messages.length === 0) return [];

  const fullMessages = await Promise.all(
    messages.map((msg) =>
      gmail.users.messages.get({ userId: 'me', id: msg.id })
    )
  );

  return fullMessages.map((res) => res.data);
}

module.exports = checkGmail;