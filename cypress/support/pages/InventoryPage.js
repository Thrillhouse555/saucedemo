class InventoryPage {
    verifyPageLoaded() {
      cy.url().should('include', '/inventory');
      cy.get('[data-test="inventory-list"]').should('be.visible');
    }
  
    addItemToCart(itemName) {
      cy.contains('[data-test="inventory-item"]', itemName)
        .find('button')
        .click();
    }
    
  }
  
  export default new InventoryPage();
  