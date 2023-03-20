import { loginPage } from "../../pageObjects/loginPage";
import { navigation } from "../../pageObjects/navigation";

// Cypress.Commands.add("loginViaUi", () => {
//   cy.visit("/");
//   navigation.signInBtn.should("be.visible").click();
//   cy.location('pathname').should('eq', '/login');
//   loginPage.login(Cypress.env("validEmail"), Cypress.env("validPassword"));
//   navigation.signInBtn.should("not.exist");
//   navigation.userProfileBtn.should("be.visible");
// });
Cypress.Commands.add("loginViaUi", () => {
  cy.request({
    method: "POST",
    url: `${Cypress.env("apiUrl")}/users/login`,
    body: {
      user: {
        email: Cypress.env("validEmail"),
        password: Cypress.env("validPassword"),
      },
    },
  }).then((response) => {
    const token = response.body.user.token;
    Cypress.env("jwtToken", token);
  });

  cy.visit("/");
  navigation.signInBtn.should("be.visible").click();
  cy.url().should("contain", "/login");
  loginPage.login(Cypress.env("validEmail"), Cypress.env("validPassword"));
  navigation.signInBtn.should("not.exist");
  navigation.userProfileBtn.should("be.visible");
});
