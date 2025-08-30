const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com/',
    projectId: "e7r1cf",
    chromeWebSecurity: false,
    watchForFileChanges: false,
    //testIsolation: false,
    setupNodeEvents(on, config) {
      on ('task', {
        logToTerminal(message) {
          const timestamp = new Date().toISOString();
          console.log(`[${timestamp}] ${message}`);
          return null;
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
