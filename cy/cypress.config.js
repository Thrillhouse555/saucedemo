const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://hotfix.citizenticket.co.uk',
    projectId: "e7r1cf",
    chromeWebSecurity: false,
    watchForFileChanges: false,
    testIsolation: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: [
      'cypress/e2e/spec.cy.js'
    ]
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
