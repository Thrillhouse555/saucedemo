class CartPage {

    itemName = '[data-test="inventory-item-name"]'
    checkoutButton = '[data-test="checkout"]'

    verifyItemInCart(itemName) {
      cy.get(this.itemName).should('contain', itemName);
    }
  
    checkout() {
      cy.get(this.checkoutButton).click();
      cy.task('logToTerminal', `User goes to checkout`);
    }
  }
  
  export default new CartPage();
  