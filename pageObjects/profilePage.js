class ProfilePage {
  get profilePage() {
    return cy.get("app-settings-page");
  }

  get logoutBtn() {
    return this.profilePage.find(".btn-outline-danger");
  }

  logout() {
    this.logoutBtn.click();
  }
}

export const profilePage = new ProfilePage();
