import MenuBar from './MenuBar';

class LoginPage {

    usernameField = '[data-test="username"]'
    passwordField = '[data-test="password"]'
    loginButton = '[data-test="login-button"]'
    error = '[data-test="error"]'

    visit() {
      cy.visit('/');
    }
  
    fillUsername(username) {
      cy.get(this.usernameField).clear().type(username);
    }
  
    fillPassword(password) {
      cy.get(this.passwordField).clear().type(password);
    }
  
    submit() {
      cy.get(this.loginButton).click();
    }
  
    login(username, password) {
      this.fillUsername(username);
      this.fillPassword(password);
      this.submit();
    }

    assertLoginSuccess() {
      cy.get(MenuBar.burgerButton).should('be.visible');
      cy.task('logToTerminal', `User is logged in`);
    }
  
    assertLoginFailed(errorMessage) {
      cy.get(this.error).should('contain.text', errorMessage);
      cy.task('logToTerminal', `Error message: ${errorMessage}`);
    }
  }
  
  export default new LoginPage();
  