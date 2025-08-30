// cypress/e2e/saucedemo/login.cy.js
import LoginPage from '../../support/pages/LoginPage';

describe('Login Tests', () => {
  beforeEach(() => {
    LoginPage.visit();
  });

  it('Login with standard user', () => {
    cy.fixture('users').then((users) => {
      const user = users.standardUser;
      LoginPage.login(user.username, user.password);
    });
    LoginPage.assertLoginSuccess();
  });

  it('Login with incorrect password', () => {
    cy.fixture('users').then((users) => {
      const user = users.incorrectPasswordUser;
      LoginPage.login(user.username, user.password);
      LoginPage.assertLoginFailed('Epic sadface: Username and password do not match');
    });
  });
});
