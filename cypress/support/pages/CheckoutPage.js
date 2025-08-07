class CheckoutPage {
    fillCheckoutInfo(first, last, postcode) {
      cy.get('[data-test="firstName"]').type(first);
      cy.get('[data-test="lastName"]').type(last);
      cy.get('[data-test="postalCode"]').type(postcode);
      cy.get('[data-test="continue"]').click();
    }
  
    finishCheckout() {
      cy.get('[data-test="finish"]').click();
      cy.get('[data-test="title"]').should('contain', 'Checkout: Complete!');
    }
  }
  
  export default new CheckoutPage();
  