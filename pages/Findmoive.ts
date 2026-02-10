
import { Page, Locator } from '@playwright/test';

export class FindMoive {
    
    readonly page: Page;
    readonly findmoiveList: Locator;
    readonly findtheaterList: Locator;
    readonly findtimeList: Locator;
    readonly bookingmoiveButton: Locator;
    readonly nofindmovieMessage: Locator;
    readonly nofindtheaterMessage: Locator;
    readonly nofindtimeMessage: Locator;
    readonly bookingmovieheader: Locator;

    constructor(page: Page) {
        this.page = page;
        // Định nghĩa Locators ngay trong constructor để gọn code
        this.findmoiveList = page.locator('select[name="film"]');
        this.findtheaterList = page.locator('select[name="cinema"]');
        this.findtimeList = page.locator('select[name="date"]');
        this.bookingmoiveButton = page.getByRole('button', { name: 'MUA VÉ NGAY' });
        this.nofindmovieMessage = page.getByRole('heading', { name: 'Bạn chưa chọn phim' });
        this.nofindtheaterMessage = page.getByRole('heading', { name: 'Bạn chưa chọn rạp' });
        this.nofindtimeMessage = page.getByRole('heading', { name: 'Bạn chưa chọn ngày giờ chiếu' });
        this.bookingmovieheader = page.getByText('0VND');
    }

    async findingmovieclick() {
        await this.bookingmoiveButton.click();
    }

    async movieclick() {
        await this.findmoiveList.click();
    }

    async theaterclick() {
        await this.findtheaterList.click();
    }

    async timeclick() {
        await this.findtimeList.click();
    }

}