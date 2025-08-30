class InventoryPage {

    list = '[data-test="inventory-list"]'
    item = '[data-test="inventory-item"]'

    verifyPageLoaded() {
      cy.url().should('include', '/inventory');
      cy.get(this.list).should('be.visible');
    }
  
    addItemToCart(itemName) {
      cy.contains(this.item, itemName).find('button').click();
      cy.task('logToTerminal', `Item: ${itemName} is added to cart`);
    }
    
  }
  
  export default new InventoryPage();
  