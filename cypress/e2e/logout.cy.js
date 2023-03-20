import { feedPage } from "../../pageObjects/feedPage";
import { navigation } from "../../pageObjects/navigation";
import { profilePage } from "../../pageObjects/profilePage";

describe("Publish article tests", () => {
  beforeEach(() => {
    cy.loginViaUi();
  });

  it("can logout", () => {
    cy.intercept("GET", `${Cypress.env("apiUrl")}/*`).as("logoutData");

    navigation.gotoUserProfile();
    feedPage.editProfile();
    profilePage.logout();

    cy.wait("@logoutData").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      navigation.signInBtn.should("exist");
      navigation.userProfileBtn.should("not.exist");
    });
  });

  afterEach(() => {
    cy.clearAllCookies();
  });
});
