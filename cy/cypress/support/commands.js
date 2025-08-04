// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import 'cypress-if';

let items = false;

Cypress.Commands.add('setItem', (key, value) => {
    items[key] = value;
    cy.writeFile('cypress/items.json', items, { timeout: 60000 });
});

Cypress.Commands.add('getItem', (key) => {
    return items[key] ?? null;
});

Cypress.Commands.add('getItems', () => {
    if (items) return items;
    cy.readFile('cypress/items.json', { timeout: 10000 }).then((storedItems) => {
        items = storedItems ?? {};
        return items;
    });
});

Cypress.Commands.add('cleverFixture', (fileName) => {
  return cy.readFile(`cypress/fixtures/${fileName}`);
});

Cypress.Commands.add('getGmail', (params) => {
  // Helper to find 'text/html'
  function findHtmlBody(part) {
    if (part.mimeType === 'text/html') return part.body?.data || null;
    if (part.parts) {
      for (const subPart of part.parts) {
        const result = findHtmlBody(subPart);
        if (result) return result;
      }
    }
    return null;
  }

  // Helper to find 'text/plain'
  function findTextBody(part) {
    if (part.mimeType === 'text/plain') return part.body?.data || null;
    if (part.parts) {
      for (const subPart of part.parts) {
        const result = findTextBody(subPart);
        if (result) return result;
      }
    }
    return null;
  }

  return cy.task('checkGmail', { query: params, maxResults: 1 }).then((emails) => {
    if (!emails.length) throw new Error('No emails found');

    const email = emails[0];
    const rawHtml = findHtmlBody(email.payload) || email.payload.body?.data || '';
    const rawText = findTextBody(email.payload) || '';

    const emailHtml = Buffer.from(rawHtml, 'base64').toString('utf8');
    const emailText = Buffer.from(rawText, 'base64').toString('utf8');

    const emailData = {
      subject: email.payload.headers.find(h => h.name === 'Subject')?.value,
      from: email.payload.headers.find(h => h.name === 'From')?.value,
      to: email.payload.headers.find(h => h.name === 'To')?.value,
      html: emailHtml,
      text: emailText
    };

    // Write to fixture for debugging or legacy usage
    return cy.writeFile('cypress/fixtures/gmail.json', emailData);
  });
});




Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false;
});

Cypress.Commands.add('cleverBeforeEach', () => {
    let data = {};

    //cy.setCookie('ct_cypress_test_mode', 'vUCwHmDeSWiSee3UjutE3wK8Fuma87');

    cy.getItems().then((storedItems) => {
        data.items = storedItems;
        return data;
    });
});

Cypress.Commands.add('cleverClearCookies', () => {
    cy.clearAllCookies();
    cy.setCookie('ct_cypress_test_mode', 'vUCwHmDeSWiSee3UjutE3wK8Fuma87');
});

// GPT legacy code
Cypress.Commands.add('legacy', () => {

  cy.get('body.iframe_loading', { timeout: 100000, retryInterval: 2000 }).should('not.exist');
  cy.get('#legacy-iframe', { timeout: 60000, retryInterval: 2000  }).should('exist');
  return cy.iframe('#legacy-iframe');
});

Cypress.Commands.add('cleverAcceptCookies', () => {
    cy.get('form#haveacookie button#allow_cookies').if().click();
});




// Extract Email Information

Cypress.Commands.add('getMostRecentGiftCode', (emails) => {

    let latestDate = new Date(0);
    let latestCode = null;
  
    for (const email of emails) {
      const currentDate = new Date(email.date);
  
      if (currentDate > latestDate) {
        latestDate = currentDate;

        const codeMatch = email.text.match(/code is (\w+)/i);
        latestCode = codeMatch ? codeMatch[1] : null;
      }
    }

    return cy.wrap(latestCode);
  });

