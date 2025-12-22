import { test, expect } from '@playwright/test';
import { Register } from '../pages/Register';
import { register } from 'module';

test.describe('Chuc nang: Dang ky (Register)', () => {
    let signUpPage: Register;

    // Chạy trước mỗi test case
    test.beforeEach(async ({ page }) => {
        signUpPage = new Register(page);
        await signUpPage.goto();
    });

    // --- CASE 1: HAPPY PATH (Nhập đủ & đúng) ---
    test('TC01: Dang ky hop le', async ({ page }) => {
        
        await signUpPage.goto();
        
        const randomId = Date.now(); // Tạo số ngẫu nhiên để không trùng user
        const validUser = {
            taiKhoan: `user${randomId}`,
            matkhau: 'Test123456@',
            confirmmatkhau: 'Test123456@',
            email: `user${randomId}@gmail.com`,
            hoTen: 'Auto Test User'
        };

        await signUpPage.fillForm(validUser);
        await signUpPage.submit();

        // Assertion:
        expect(signUpPage.confirmedRegisterMassage.isVisible());

    });

    // --- CASE 2: Bỏ trống thông tin bắt buộc: tất cả ---
    test('TC02: Fail by Nhap thieu truong bat buoc', async ({ page }) => {
        // Không điền gì cả, bấm Submit luôn
        await signUpPage.submit();

        // Assertion: Kiểm tra thông báo lỗi xuất hiện
        const errorCount = await signUpPage.MessRegisterInput.count();
        expect(errorCount).toBeGreaterThan(0);
        console.log("Các trường nhập liệu còn thiếu: "+errorCount);

    });

    // --- CASE 3: Bỏ trống thông tin bắt buộc: Password ---
    test('TC03: Fail by Thieu 1 truong bat buoc (Password)', async ({ page }) => {
        
        await signUpPage.goto();
    
        const randomId = Date.now(); // Tạo số ngẫu nhiên để không trùng user
        //Nhập thiếu mật khẩu
        const validUser = {
            taiKhoan: `user${randomId}`,
            confirmmatkhau: 'Test123456@',
            email: `user${randomId}@gmail.com`,
            hoTen: 'Auto Test User'
        };

        await signUpPage.fillForm(validUser);
        await signUpPage.submit();

        // Assertion: Kiểm tra thông báo lỗi xuất hiện
        expect(signUpPage.matKhauMessage).toBeVisible();

        const errorCount = await signUpPage.MessRegisterInput.count();
        expect(errorCount).toBeGreaterThan(0);
        console.log("Các trường nhập liệu còn thiếu: " + errorCount);
        console.log("Trường nhập liệu còn thiếu: Mật khẩu");
    });


    // --- CASE 4: Password and ConfirmPW không giống nhau ---
    test('TC04: Fail by Password and ConfirmPW not match', async ({ page }) => {
        
        await signUpPage.goto();
    
        const randomId = Date.now(); // Tạo số ngẫu nhiên để không trùng user
        //Nhập matkhau và confirmmatkhau không khớp
        const validUser = {
            taiKhoan: `user${randomId}`,
            matkhau: 'Test1234567@',
            confirmmatkhau: 'Test123456@',
            email: `user${randomId}@gmail.com`,
            hoTen: 'Auto Test User'
        };

        await signUpPage.fillForm(validUser);
        await signUpPage.submit();

        // Assertion: Kiểm tra thông báo lỗi xuất hiện
        expect(signUpPage.confirmmatKhauMessagematch).toBeVisible();
        console.log("Trường matkhau và confirmmatkhau không khớp");
    });


    // --- CASE 5: Trùng email ---
    test('TC05: Fail by Dumplicate Email', async ({ page }) => {
        
        await signUpPage.goto();
    
        const randomId = Date.now(); // Tạo số ngẫu nhiên để không trùng user
        //Nhập Trùng email
        const validUser = {
            taiKhoan: `user${randomId}`,
            matkhau: 'Test123456@',
            confirmmatkhau: 'Test123456@',
            email: `user176518057072`,
            hoTen: 'Auto Test User'
        };

        await signUpPage.fillForm(validUser);
        await signUpPage.submit();

        await expect(signUpPage.duplicateEmail).toBeVisible();
        console.log("Fail by Dumplicate Email");

    });
});