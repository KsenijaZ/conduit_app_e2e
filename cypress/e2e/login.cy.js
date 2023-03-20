import { loginPage } from "../../pageObjects/loginPage";
import { navigation } from "../../pageObjects/navigation";
import { constants } from "../fixtures/constants";

describe("Login page", () => {
  beforeEach(() => {
    cy.visit("/");
    navigation.signUpBtn.should("be.visible");
    navigation.signInBtn.should("be.visible");
    navigation.signInBtn.click();
    cy.url().should("contain", "/login");
  });

  it("should login with valid credentials", () => {
    cy.intercept("POST", `${Cypress.env("apiUrl")}/users/login`).as(
      "loginData"
    );

    loginPage.login(Cypress.env("validEmail"), Cypress.env("validPassword"));

    cy.wait("@loginData").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body.user.token).to.exist;
      navigation.signInBtn.should("not.exist");
      navigation.userProfileBtn.should("be.visible");
    });
  });

  it("should show error message when login with non-existing email", () => {
    cy.intercept("POST", `${Cypress.env("apiUrl")}/users/login`).as(
      "loginData"
    );

    loginPage.login(constants.randomUserEmail, Cypress.env("validPassword"));

    cy.wait("@loginData").then((interception) => {
      expect(interception.response.statusCode).to.eq(403);
      expect(interception.response.body.user).to.be.undefined;
      navigation.signInBtn.should("exist");
      cy.url().should("contain", "/login");
      loginPage.errorMessage
        .should("be.visible")
        .and("have.text", " email or password is invalid ")
        .and("have.css", "color", "rgb(184, 92, 92)");
      navigation.userProfileBtn.should("not.exist");
    });
  });

  it("should show error message when login with valid email and incorrect password", () => {
    cy.intercept("POST", `${Cypress.env("apiUrl")}/users/login`).as(
      "loginData"
    );

    loginPage.login(Cypress.env("validEmail"), constants.randomUserPassword);

    cy.wait("@loginData").then((interception) => {
      expect(interception.response.statusCode).to.eq(403);
      expect(interception.response.body.user).to.be.undefined;
      navigation.signInBtn.should("exist");
      cy.url().should("contain", "/login");
      loginPage.errorMessage
        .should("be.visible")
        .and("have.text", " email or password is invalid ")
        .and("have.css", "color", "rgb(184, 92, 92)");
      navigation.userProfileBtn.should("not.exist");
    });
  });

  it("should show error message when login with wrong format email and valid password", () => {
    cy.intercept("POST", `${Cypress.env("apiUrl")}/users/login`).as(
      "loginData"
    );

    loginPage.login(constants.wrongFormatEmail, Cypress.env("validPassword"));

    cy.wait("@loginData").then((interception) => {
      expect(interception.response.statusCode).to.eq(403);
      expect(interception.response.body.user).to.be.undefined;
      navigation.signInBtn.should("exist");
      cy.url().should("contain", "/login");
      loginPage.errorMessage
        .should("be.visible")
        .and("have.text", " email or password is invalid ")
        .and("have.css", "color", "rgb(184, 92, 92)");
      navigation.userProfileBtn.should("not.exist");
    });
  });
  afterEach(() => {
    cy.clearAllCookies();
  });
});
