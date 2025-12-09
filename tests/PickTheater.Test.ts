import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/Loginpage';
import { MovieDetailPage } from '../pages/MovieDetailPage';

test.describe('Chuc nang: Select Cinema Theater', () => {
    let loginPage: LoginPage;
    let movieDetailPage: MovieDetailPage;

    // Setup chung: Login & Vào trang chi tiết Avatar 2
    test.beforeEach(async ({ page }) => {
    const USER = 'user1765178655646';
    const PASS = 'Test123456@';
    loginPage = new LoginPage(page);
    movieDetailPage = new MovieDetailPage(page);
        // 1. Đăng nhập
    await loginPage.goto();
    await loginPage.login(USER, PASS);

    // 2. Vào trang chi tiết phim Avatar 2 (ID: 9390)
    // Lưu ý: Nếu ID phim thay đổi, hãy update lại số này
    await page.goto('https://demo1.cybersoft.edu.vn/detail/9390');
        
    // Assertion: Đảm bảo đã vào trang chi tiết
    await expect(page).toHaveURL(/detail/);
    });

    //TC01: Click chọn rạp BHD---
    test('TC01: Click chọn rạp BHD', async ({ page }) => {
        const theater = 'BHD Star Cineplex';
        await movieDetailPage.selectTheatercompany(theater);
        const titleDetail = page.locator('div, .hasText').first();
        await expect(titleDetail).toContainText(theater, { ignoreCase: true });
    });

    //TC02: Click chọn rạp CGV---
    test('TC02: Click chọn rạp CGV', async ({ page }) => {
        const theater = 'cgv';
        await movieDetailPage.selectTheatercompany(theater);
        const titleDetail = page.locator('div, .hasText').first();
        await expect(titleDetail).toContainText(theater, { ignoreCase: true });
    });

    //TC03: Click chọn rạp MEGAGS---
    test('TC03: Click chọn rạp MEGAGS', async ({ page }) => {
        const theater = 'MegaGS';
        await movieDetailPage.selectTheatercompany(theater);
        const titleDetail = page.locator('div, .hasText').first();
        await expect(titleDetail).toContainText(theater, { ignoreCase: true });
    });

});