class LoginPage {
  get loginPage() {
    return cy.get(".auth-page");
  }

  get email() {
    return this.loginPage.find('input[formcontrolname="email"]');
  }

  get password() {
    return this.loginPage.find('input[formcontrolname="password"]');
  }

  get submitBtn() {
    return this.loginPage.find('button[type="submit"]');
  }

  get errorMessage() {
    return this.loginPage.find(".error-messages li");
  }

  login(email, password) {
    this.email.type(email);
    this.password.type(password);
    this.submitBtn.click();
  }
}

export const loginPage = new LoginPage();
