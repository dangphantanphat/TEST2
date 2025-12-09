import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/Loginpage';
import { LogoutPage } from '../pages/Logout';

test.describe('Chuc nang: Log Out', () => {
    let loginPage: LoginPage;
    let logoutpage: LogoutPage;
    test.beforeEach(async ({ page }) => {
    const USER = 'user1765178655646';
    const PASS = 'Test123456@';
    loginPage = new LoginPage(page);
    logoutpage = new LogoutPage(page);
        // 1. Đăng nhập
    await loginPage.goto();
    await loginPage.login(USER, PASS);
    console.log("Before Each executed");
    });

    //TC01: Log Out---
    test('TC01: Log Out', async ({ page }) => {
        await logoutpage.logoutclick();
        await expect(logoutpage.headerLogout).toBeVisible();
    });

    //TC02: Log Out Confirm No---
    test('TC02: Log Out Confirm No', async ({ page }) => {
        await logoutpage.logoutclick();
        await logoutpage.logoutclickNo();
        await expect(logoutpage.logoutButton).toBeVisible();
    });

    //TC03: Log Out Confirm Yes---
    test('TC03: Log Out Confirm Yes', async ({ page }) => {
        await logoutpage.logoutclick();
        await logoutpage.logoutclickYes();
        await expect(logoutpage.headerLoginBtn).toBeVisible();
    });

});