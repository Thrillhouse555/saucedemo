const { defineConfig } = require("cypress");
const checkGmail = require('./gmail/check-gmail');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://hotfix.citizenticket.co.uk',
    projectId: "e7r1cf",
    chromeWebSecurity: false,
    watchForFileChanges: false,
    testIsolation: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on ('task', {
        logToTerminal(message) {
          console.log(message);
          return null;
        },
        checkGmail(args) {
          return checkGmail(args); // expects {query , maxResults }
        }
      })
    },
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
    },
    specPattern: 'cypress/component/**/*.cy.{js,jsx,ts,tsx}',
    testIsolation: true 
  },
  pageLoadTimeout: 120000,
  defaultCommandTimeout: 10000,
  video: false,
  screenshotOnRunFailure: false,
});
