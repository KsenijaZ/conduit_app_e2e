class Navigation {
  get header() {
    return cy.get("app-layout-header");
  }

  get homeBtn() {
    return this.header.find('[href="/"]');
  }

  get signInBtn() {
    return this.header.find('[href="/login"]');
  }

  get signUpBtn() {
    return this.header.find('[href="/register"]');
  }

  get newArticleBtn() {
    return this.header.find('[href="/editor"]');
  }

  get settingsBtn() {
    return this.header.find('[href="/settings"]');
  }

  get userProfileBtn() {
    return this.header.find("li").contains(Cypress.env("validUserName"));
  }

  gotoUserProfile() {
    this.userProfileBtn.click();
  }
  addNewArticle() {
    this.newArticleBtn.click();
  }
}

export const navigation = new Navigation();
