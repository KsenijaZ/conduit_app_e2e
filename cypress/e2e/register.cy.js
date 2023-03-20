import { navigation } from "../../pageObjects/navigation";
import { register } from "../../pageObjects/registerPage";
import { constants } from "../fixtures/constants";

describe("Register page tests", () => {
  const apiUrl = Cypress.env("apiUrl");

  beforeEach(() => {
    cy.visit("/");
    navigation.signUpBtn.should("be.visible");
    navigation.signInBtn.should("be.visible");
    navigation.signUpBtn.click();
    cy.url().should("contain", "/register");
  });

  it("can register with valid data", () => {
    cy.intercept("POST", `${apiUrl}/users`).as("registerData");

    register.register(
      Cypress.env("validUserName"),
      Cypress.env("validEmail"),
      Cypress.env("validPassword")
    );

    cy.wait("@registerData").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body.user.token).to.exist;
      navigation.signUpBtn.should("not.exist");
    });
  });

  it("can register with valid data as user 01", () => {
    cy.intercept("POST", `${apiUrl}/users`).as("registerData");

    register.register(
      constants.user01Name,
      constants.user01Email,
      constants.user01Password
    );

    cy.wait("@registerData").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body.user.token).to.exist;
      navigation.signUpBtn.should("not.exist");
    });
  });

  it.only("can register with random data", () => {
    cy.intercept("POST", `${apiUrl}/users`).as("registerRandomData");

    register.register(
      constants.randomUserName,
      constants.randomUserEmail,
      constants.randomUserPassword
    );

    cy.wait("@registerRandomData").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body.user.token).to.exist;
      navigation.signUpBtn.should("not.exist");
    });
  });

  it("cannot register with existing email", () => {
    cy.intercept("POST", `${apiUrl}/users`).as("registerExistingEmail");

    register.register(
      constants.user01Name,
      constants.user01Email,
      constants.user01Password
    );

    cy.wait("@registerExistingEmail").then((interception) => {
      expect(interception.response.statusCode).to.eq(422);
      expect(interception.response.body.errors.email[0]).to.eq(
        "has already been taken"
      );
      navigation.signUpBtn.should("be.visible");
    });
  });

  it("cannot register with existing username", () => {
    cy.intercept("POST", `${apiUrl}/users`).as("registerExistingUsername");

    register.register(
      constants.user01Name,
      constants.randomUserEmail,
      constants.randomUserPassword
    );

    cy.wait("@registerExistingUsername").then((interception) => {
      expect(interception.response.statusCode).to.eq(422);
      expect(interception.response.body.errors.username[0]).to.eq(
        "has already been taken"
      );
      navigation.signUpBtn.should("be.visible");
    });
  });

  afterEach(() => {
    cy.clearAllCookies();
  });
});
