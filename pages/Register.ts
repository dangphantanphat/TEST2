import { Page, Locator, expect } from '@playwright/test';

export class Register {
    readonly page: Page;
    readonly taiKhoanInput: Locator;
    readonly matKhauInput: Locator;
    readonly confirmmatKhauInput: Locator;
    readonly emailInput: Locator;
    readonly hoTenInput: Locator;
    readonly taiKhoanMessage : Locator;
    readonly matKhauMessage : Locator;
    readonly confirmmatKhauMessage : Locator;
    readonly emailMessage : Locator;
    readonly hoTenMessage : Locator;
    readonly confirmmatKhauMessagematch : Locator;
    readonly duplicateEmail : Locator;
    readonly dangKyBtn: Locator;
    readonly RegisterBtn: Locator;
    readonly MessRegisterInput: Locator;

    
    // Locator cho thông báo lỗi (Thường là thẻ div/span màu đỏ dưới input)
    // Lưu ý: Selector này cần điều chỉnh tùy theo UI thực tế (ví dụ .text-danger, .alert)

    constructor(page: Page) {
        this.page = page;
        // Map theo name attribute (thường thấy ở web Cybersoft)
        this.taiKhoanInput = page.getByRole('textbox', { name: 'Tài Khoản' });
        this.matKhauInput = page.getByRole('textbox', { name: 'Mật Khẩu', exact: true });
        this.confirmmatKhauInput = page.getByRole('textbox', { name: 'Nhập lại mật khẩu' });
        this.emailInput = page.getByRole('textbox', { name: 'Email' });
        this.hoTenInput = page.getByRole('textbox', { name: 'Họ Tên' });
        this.dangKyBtn = page.locator('button[type="submit"], button:has-text("Đăng Ký")');
        this.RegisterBtn = page.getByRole('link', { name: 'Đăng Ký' });
        
        // Selector cho thông báo lỗi. Ví dụ tìm class báo lỗi
        this.taiKhoanMessage = page.locator('#taiKhoan-helper-text');
        this.matKhauMessage = page.locator('#matKhau-helper-text');
        this.confirmmatKhauMessage = page.locator('#confirmPassWord-helper-text');
        this.emailMessage = page.locator('#email-helper-text');
        this.hoTenMessage = page.locator('#hoTen-helper-text');
        this.confirmmatKhauMessagematch = page.locator('#confirmPassWord-helper-text');
        this.duplicateEmail = page.getByText('Email đã tồn tại!');

        this.MessRegisterInput = page.getByText('Đây là trường bắt buộc !');

    }

    async goto() {
        await this.page.goto('https://demo1.cybersoft.edu.vn/');
        if (await this.RegisterBtn.isVisible()) {
            await this.RegisterBtn.click();
        }
    }

    
    // Hàm điền full thông tin
    async fillForm(user: any) {
        if (user.taiKhoan) await this.taiKhoanInput.fill(user.taiKhoan);
        if (user.matkhau) await this.matKhauInput.fill(user.matkhau);
        if (user.confirmmatkhau) await this.confirmmatKhauInput.fill(user.confirmmatkhau);
        if (user.email) await this.emailInput.fill(user.email);
        if (user.hoTen) await this.hoTenInput.fill(user.hoTen);
    }

    async submit() {
        await this.dangKyBtn.click();
    }
}