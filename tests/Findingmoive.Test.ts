// tests/booking.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/Loginpage';
import { FindMoive } from '../pages/Findmoive';

test.describe('Chuc nang: Tim loc phim', () => {
    let findingmoive: FindMoive;
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
    findingmoive = new FindMoive(page);
    loginPage = new LoginPage(page);
        await loginPage.goto();
  });
    

    test('TC01: Tim phim hop le', async ({ page }) => {

        // Gọi click dropdown list Moive từ Page Object
        await  findingmoive.movieclick();
        const dropdownPhim = page.locator('select[name="film"]');
        await dropdownPhim.selectOption({ label: 'AVATAR 2' });
        await expect(dropdownPhim).toHaveValue('9390');


        // Gọi click dropdown list Theater từ Page Object
        await  findingmoive.theaterclick();
        const dropdownTheater = page.locator('select[name="cinema"]');
        await dropdownTheater.selectOption({ label: 'CGV - VivoCity' });
        await expect(dropdownTheater).toHaveValue('cgv-vivocity');

        // Gọi click dropdown list Time từ Page Object
        await  findingmoive.timeclick();
        const dropdownTime = page.locator('select[name="date"]');
        await dropdownTime.selectOption({ label: '07/10/2021 ~ 08:25' });
        await expect(dropdownTime).toHaveValue('45055');

        // Gọi click Mua ve ngay từ Page Object
        await findingmoive.findingmovieclick();
        await expect(findingmoive.bookingmovieheader).toBeVisible();

    });

    test('TC02: Bao loi khi chua chon Moive', async ({ page }) => {

        // Gọi click Mua ve ngay từ Page Object
        await findingmoive.findingmovieclick();
        await expect(findingmoive.nofindmovieMessage).toBeVisible();

    });

    test('TC03: Bao loi khi chua chon Theater', async ({ page }) => {

        // Gọi click dropdown list Moive từ Page Object
        await  findingmoive.movieclick();
        const dropdownPhim = page.locator('select[name="film"]');
        await dropdownPhim.selectOption({ label: 'AVATAR 2' });
        await expect(dropdownPhim).toHaveValue('9390');

        // Gọi click Mua ve ngay từ Page Object
        await findingmoive.findingmovieclick();
        await expect(findingmoive.nofindtheaterMessage).toBeVisible();

    });

    test('TC04: Bao loi khi chua chon Time', async ({ page }) => {

        // Gọi click dropdown list Moive từ Page Object
        await  findingmoive.movieclick();
        const dropdownPhim = page.locator('select[name="film"]');
        await dropdownPhim.selectOption({ label: 'AVATAR 2' });
        await expect(dropdownPhim).toHaveValue('9390');


        // Gọi click dropdown list Theater từ Page Object
        await  findingmoive.theaterclick();
        const dropdownTheater = page.locator('select[name="cinema"]');
        await dropdownTheater.selectOption({ label: 'CGV - VivoCity' });
        await expect(dropdownTheater).toHaveValue('cgv-vivocity');

        // Gọi click Mua ve ngay từ Page Object
        await findingmoive.findingmovieclick();
        await expect(findingmoive.nofindtimeMessage).toBeVisible();

    });


});