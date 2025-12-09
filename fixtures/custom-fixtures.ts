import { test as base } from '@playwright/test';
import { HomePage } from '../pages/Homepage';
import { LoginPage } from '../pages/Loginpage';
import { SelectMovie } from '../pages/SelectMovie';

// Declare the types of your fixtures.
type MyFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  authenticatedPage: LoginPage
};

// Extend base test by providing "todoPage" and "settingsPage".
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<MyFixtures>({
  homePage: async ({ page }, use) => {
    // Set up the fixture.
    const homePage = new HomePage(page);
    
    // Use the fixture value in the test.
    await use(homePage);
  },
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    loginPage.login("valid_acc", "valid_passs")
    await use(loginPage);
  }
});
export { expect } from '@playwright/test';