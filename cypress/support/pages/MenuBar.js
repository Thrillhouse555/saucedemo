import LoginPage from './LoginPage';

class MenuBar {

    burgerButton = '#react-burger-menu-btn'
    logoutLink = '[data-test="logout-sidebar-link"]'
    cartLink = '[data-test="shopping-cart-link"]'

    logout() {
      cy.get(this.burgerButton).click();
      cy.get(this.logoutLink).should('be.visible').click();
      cy.get(LoginPage.loginButton).should('be.visible')
      cy.task('logToTerminal', `User is logged out`);
    }

    goToCart() {
      cy.get(this.cartLink).click();
      cy.task('logToTerminal', `User gone to cart page`);
    }
  }
  
  export default new MenuBar();
  