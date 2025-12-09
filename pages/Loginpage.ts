// pages/LoginPage.ts
import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly headerLoginBtn: Locator;
    readonly headerLoginpass: Locator;
    readonly headerLoginfail: Locator;
    readonly LoginrememberTick: Locator;

    constructor(page: Page) {
        this.page = page;
        // Định nghĩa Locators ngay trong constructor để gọn code
        this.headerLoginBtn = page.locator('text=Đăng nhập').first();
        this.usernameInput = page.locator('input[name="taiKhoan"]');
        this.passwordInput = page.locator('input[name="matKhau"]');
        this.loginButton = page.locator('button[type="submit"], button:has-text("Đăng nhập")');
        this.headerLoginpass = page.getByRole("heading", { name: "Đăng nhập thành công" });
        this.headerLoginfail = page.getByText('Tài khoản hoặc mật khẩu không');
        this.LoginrememberTick = page.getByRole('checkbox', { name: 'Nhớ tài khoản' });
    }

    async goto() {
        await this.page.goto('https://demo1.cybersoft.edu.vn/');
    }

    async login(username: string, pass: string) {
        // Nếu đang ở trang chủ thì click nút Login để mở form
        if (await this.headerLoginBtn.isVisible()) {
            await this.headerLoginBtn.click();
        }
        
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(pass);
        await this.LoginrememberTick.click();
        await this.loginButton.click();
    }
}