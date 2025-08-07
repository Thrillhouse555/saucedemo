class MenuBar {
    logout() {
      cy.get('#react-burger-menu-btn').click();
      cy.get('[data-test="logout-sidebar-link"]').should('be.visible').click();
      cy.url().should('include', '/index.html');
    }

    goToCart() {
      cy.get('[data-test="shopping-cart-link"]').click();
    }
  }
  
  export default new MenuBar();
  