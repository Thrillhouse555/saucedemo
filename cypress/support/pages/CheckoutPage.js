class CheckoutPage {

    firstNameField = '[data-test="firstName"]'
    lastNameField = '[data-test="lastName"]'
    postcodeField = '[data-test="postalCode"]'
    continueButton = '[data-test="continue"]'
    finishButton = '[data-test="finish"]'
    completeCheckoutTitle = '[data-test="title"]'

    fillCheckoutInfo(first, last, postcode) {
      cy.get(this.firstNameField).type(first);
      cy.get(this.lastNameField).type(last);
      cy.get(this.postcodeField).type(postcode);
      cy.get(this.continueButton).click();
      cy.task('logToTerminal', `User fills checkout info`);
    }
  
    finishCheckout() {
      cy.get(this.finishButton).click();
      cy.get(this.completeCheckoutTitle).should('contain', 'Checkout: Complete!');
      cy.task('logToTerminal', `User completes checkout`);
    }
  }
  
  export default new CheckoutPage();
  