describe('basic tests', () => {

  beforeEach(() => {
    cy.clearAllCookies();
    cy.clearLocalStorage();
    cy.viewport(1280, 720);
    cy.visit('https://www.saucedemo.com/');
});

  it('standard user', () => {
    cy.get('input[data-test="username"]').type('standard_user');
    cy.get('input[data-test="password"]').type('secret_sauce');
    cy.get('input[data-test="login-button"]').click();
    cy.get('div[data-test="primary-header"]').should('contain.text', 'Swag Labs')
  })


  it('locked out user', () => {
    cy.get('input[data-test="username"]').type('locked_out_user');
    cy.get('input[data-test="password"]').type('secret_sauce');
    cy.get('input[data-test="login-button"]').click();
    cy.get('h3[data-test="error"]').should('contain.text', 'Epic sadface: Sorry, this user has been locked out.')
  })

  it('log in and buy an item', () => {
    cy.get('input[data-test="username"]').type('standard_user');
    cy.get('input[data-test="password"]').type('secret_sauce');
    cy.get('input[data-test="login-button"]').click();
    cy.get('button[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('a[data-test="shopping-cart-link"] span').should('contain.text', '1');
  })

})