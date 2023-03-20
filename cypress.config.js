const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    configFile: "reporter-config.json",
  },

  reporterEnabled: "mocha-junit-reporter",
  mochaJunitReporterReporterOptions: {
    mochaFile: "cypress/results/junit/results-[hash].xml",
  },

  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/results/mochawesome",
    overwrite: false,
    html: false,
    json: true,
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://conduit-app.ksenijazlatic.com/",
    env: {
      validUserName: "valid_User_Name",
      validEmail: "valid_user_name@gmail.com",
      validPassword: "pass1234",
      apiUrl: "https://api.realworld.io/api",
      jwtToken: "<token-value>",
    },
  },
});
