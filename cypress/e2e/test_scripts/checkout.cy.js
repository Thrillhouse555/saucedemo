import LoginPage from '../../support/pages/LoginPage';
import InventoryPage from '../../support/pages/InventoryPage';
import CartPage from '../../support/pages/CartPage';
import CheckoutPage from '../../support/pages/CheckoutPage';
import MenuBar from '../../support/pages/MenuBar';

describe('Checkout Tests', () => {
  it('Login, add item, checkout', () => {
    LoginPage.visit();
    LoginPage.login('standard_user', 'secret_sauce');

    InventoryPage.verifyPageLoaded();
    InventoryPage.addItemToCart('Sauce Labs Backpack');
    MenuBar.goToCart();

    CartPage.verifyItemInCart('Sauce Labs Backpack');
    CartPage.checkout();

    CheckoutPage.fillCheckoutInfo('John', 'Doe', '12345');
    CheckoutPage.finishCheckout();
  });
});
