import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/Loginpage';
import { MovieDetailPage } from '../pages/MovieDetailPage';

test.describe('Chuc nang: History Ordered', () => {
    let loginPage: LoginPage;
    test.beforeEach(async ({ page }) => {
    const USER = 'user1765178655646';
    const PASS = 'Test123456@';
    loginPage = new LoginPage(page);
        // 1. Đăng nhập
    await loginPage.goto();
    await loginPage.login(USER, PASS);
    console.log("Before Each executed");
    });

    //TC01: Xem history ticket ordered---
    test('TC01: Xem history ticket ordered', async ({ page }) => {

        const usertitle = page.getByRole('link', { name: 'Avatar Auto Test User' });
        await usertitle.click();

        const userhistory = page.getByRole('heading', { name: 'Lịch sử đặt vé' });
        await expect(userhistory).toBeVisible();
    });

});