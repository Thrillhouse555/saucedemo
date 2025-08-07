import LoginPage from '../../support/pages/LoginPage';
import InventoryPage from '../../support/pages/InventoryPage';
import MenuBar from '../../support/pages/MenuBar';

describe('Logout Tests', () => {
  it('Login and logout', () => {
    LoginPage.visit();
    LoginPage.login('standard_user', 'secret_sauce');
    InventoryPage.verifyPageLoaded();

    MenuBar.logout();
  });
});
