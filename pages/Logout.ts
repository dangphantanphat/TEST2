import { Page, Locator, expect } from '@playwright/test';

export class LogoutPage {
    readonly page: Page;
    readonly headerLoginBtn: Locator;
    readonly logoutButton: Locator;
    readonly headerLogout: Locator;
    readonly logoutyesButton: Locator;
    readonly logoutnoButton: Locator;

    constructor(page: Page) {
        this.page = page;
        // Định nghĩa Locators ngay trong constructor để gọn code
        this.headerLoginBtn = page.locator('text=Đăng nhập').first();
        this.headerLogout = page.getByRole('heading', { name: 'Bạn có muốn đăng xuất ?' });
        this.logoutButton = page.getByRole('link', { name: 'Đăng xuất' })
        this.logoutyesButton = page.getByRole('button', { name: 'Đồng ý' });
        this.logoutnoButton = page.getByRole('button', { name: 'Hủy' });
    }

    async logoutclick() {
        await this.logoutButton.click();
    }

    async logoutclickYes() {
        await this.logoutyesButton.click();
    }

    async logoutclickNo() {
        await this.logoutnoButton.click();
    }
}