// tests/booking.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/Loginpage';
import { Clickmoive } from '../pages/Clickmoive';

test.describe('Chuc nang: Xem trailer & Click movie', () => {

    test.beforeEach(async ({ page }) => {
    const USER = 'user1765178655646';
    const PASS = 'Test123456@';
    const loginPage = new LoginPage(page);
        // 1. Đăng nhập
    await loginPage.goto();
    await loginPage.login(USER, PASS);

    console.log("Before Each executed");
  });
    
    // Khai báo data test


    test('TC01: Click Avatar 2 trailer', async ({ page }) => {
        const MOVIE_NAME = 'Avatar 2';
        const clickMoive = new Clickmoive(page);
        console.log(`Opening trailer for: ${MOVIE_NAME}`);
        
        // Gọi hàm mở trailer từ Page Object
        const modal = await clickMoive.openTrailer(MOVIE_NAME);

        // Assertion 1: Modal trailer phải hiện
        await expect(modal).toBeVisible();

        // Assertion 2: Kiểm tra bên trong modal có iframe Youtube không
        const iframe = modal.locator('iframe');
        await expect(iframe).toBeVisible();
        
    });

    // --- CASE 2: Chọn phim đặt vé ---
    test('TC02: Click moive AVATAR 2', async ({ page }) => {

        const MOVIE_NAME = 'AVATAR 2';
        console.log(`Booking ticket for: ${MOVIE_NAME}`);

        // Tìm thẻ <a> có thuộc tính href CHỨA "/detail/9390" riêng cho AVATAR 2
        await page.locator('a[href*="/detail/9390"]').first().click();

        const titleDetail = page.locator('h1, .title-movie').first();
        await expect(titleDetail).toContainText(MOVIE_NAME, { ignoreCase: true });
        
    });

    test('TC03: Click moive Man of Steel', async ({ page }) => {
        
        const MOVIE_NAME = 'Man of Steel';
        console.log(`Booking ticket for: ${MOVIE_NAME}`);

        // Tìm thẻ <a> có thuộc tính href CHỨA "/detail/9387" riêng cho Man of Steel
        await page.locator('a[href*="/detail/9387"]').first().click();

        const titleDetail = page.locator('h1, .title-movie').first();
        await expect(titleDetail).toContainText(MOVIE_NAME, { ignoreCase: true });
        
    });


});