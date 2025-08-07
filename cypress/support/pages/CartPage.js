class CartPage {
    verifyItemInCart(itemName) {
      cy.get('[data-test="inventory-item-name"]').should('contain', itemName);
    }
  
    checkout() {
      cy.get('[data-test="checkout"]').click();
    }
  }
  
  export default new CartPage();
  