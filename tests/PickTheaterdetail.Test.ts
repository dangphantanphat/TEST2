import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/Loginpage';
import { MovieDetailPage } from '../pages/MovieDetailPage';

test.describe('Chuc nang: Select Theater Detail', () => {
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
    const theater = 'cgv';
    await movieDetailPage.selectTheatercompany(theater);
    });

    //TC01: Click chọn rạp CGV Vivo city---
    test('TC01: Click chọn rạp CGV Vivo city', async ({ page }) => {
        const MOVIE_THEATER = 'CGV - VivoCity';
        console.log(`Booking ticket for: ${MOVIE_THEATER}`);

        // Tìm có thuộc tính jss41 riêng cho RẠP CGV Vivo
        await page.locator('.jss41').first().click();

        const titleDetail = page.getByText('Cụm Rạp:CGV - VivoCity');
        await expect(titleDetail).toContainText(MOVIE_THEATER, { ignoreCase: true });

    });

    //TC02: Click chọn rạp CGV - Golden Plaza---
    test('TC02: Click chọn rạp CGV Golden Plaza', async ({ page }) => {
        const MOVIE_THEATER = 'CGV - Golden Plaza';
        console.log(`Booking ticket for: ${MOVIE_THEATER}`);

        // Tìm có thuộc tính jss41 riêng cho RẠP CGV Vivo
        await page.locator('.jss41').last().click();

        const titleDetail = page.getByText('Cụm Rạp:CGV - Golden Plaza');
        await expect(titleDetail).toContainText(MOVIE_THEATER, { ignoreCase: true });
    });

});

test.describe('Chuc nang: Pick seat & Order', () => {
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
    const theater = 'cgv';
    await movieDetailPage.selectTheatercompany(theater);
    await page.locator('.jss41').first().click();
    });

    //TC01: Click chọn rạp CGV Vivo city---
    test('TC01: Click 1 seat', async ({ page }) => {
        const SEAT_THEATER = '37';
        // Tìm có thuộc tính jss41 riêng cho RẠP CGV Vivo
        await page.getByRole('button', { name: '37', exact: true }).click();

        const titleDetail = page.locator('div:nth-child(13)');
        await expect(titleDetail).toContainText(SEAT_THEATER, { ignoreCase: true });

    });

    //TC02: Click 2 seats---
    test('TC02 : Click more seats', async ({ page }) => {
        const SEAT_THEATER = '01';
        const SEAT_THEATER2 = '02';
        // Tìm có thuộc tính jss41 riêng cho RẠP CGV Vivo
        await page.getByRole('button', { name: '01', exact: true }).click();
        await page.getByRole('button', { name: '02', exact: true }).click();

        const titleDetail = page.locator('div:nth-child(13)');
        await expect(titleDetail).toContainText(SEAT_THEATER, { ignoreCase: true });
        await expect(titleDetail).toContainText(SEAT_THEATER2, { ignoreCase: true });

    });

    //TC03: Click 2 seat & Booking ticket---
    test('TC03: Click 2 seats & Booking ticket', async ({ page }) => {
        await page.getByRole('button', { name: '156', exact: true }).click();
        await page.getByRole('button', { name: '155', exact: true }).click();
        movieDetailPage.orderTicket();
        await expect(movieDetailPage.headerBuypass).toBeVisible();
    });

    //TC04: No seat & Booking ticket---
    test('TC04: No seat & Booking ticket', async ({ page }) => {
        movieDetailPage.orderTicket();
        await expect(movieDetailPage.headerBuynoselect).toBeVisible();
    });
    
    


});