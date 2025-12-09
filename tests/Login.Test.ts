// tests/booking.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/Loginpage';
import { SelectMovie } from '../pages/SelectMovie';

test.describe('Chuc nang: Dang nhap', () => {
    
    // Khai báo data test
    const USER = 'user1765178655646';
    const USERFAIL = 'Testaefad88de3ff4ca2b9d3679f1199415c1';
    const PASS = 'Test123456@';

    test('TC01: Login Pass', async ({ page }) => {
        // Khởi tạo các Page Object
        const loginPage = new LoginPage(page);

        // 1. Đăng nhập
        await loginPage.goto();
        await loginPage.login(USER, PASS);
        await expect(loginPage.headerLoginpass).toBeVisible();
        
    });


    test('TC02: Login Failed', async ({ page }) => {
        // Khởi tạo các Page Object
        const loginPage = new LoginPage(page);

        // 1. Đăng nhập
        await loginPage.goto();
        await loginPage.login(USERFAIL, PASS);
        await expect(loginPage.headerLoginfail).toBeVisible();
        
    });
});