class RegisterPage {
  get registerPage() {
    return cy.get("app-auth-page");
  }

  get userNameInput() {
    return this.registerPage.find('[formcontrolname="username"]');
  }

  get email() {
    return this.registerPage.find('input[formcontrolname="email"]');
  }

  get password() {
    return this.registerPage.find('input[formcontrolname="password"]');
  }

  get submitBtn() {
    return this.registerPage.find('button[type="submit"]');
  }

  register(username, email, password) {
    this.userNameInput.type(username);
    this.email.type(email);
    this.password.type(password);
    this.submitBtn.click();
  }
}

export const register = new RegisterPage();
