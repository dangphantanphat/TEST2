import { Page, Locator, expect } from '@playwright/test';

export class MovieDetailPage {

    readonly page: Page;
    readonly bookBHDButton: Locator;
    readonly bookCGVButton: Locator;
    readonly bookMEGAGSButton: Locator;
    readonly headerBuypass: Locator;
    readonly headerBuynologin: Locator;
    readonly headerBuynoselect: Locator;

    constructor(page: Page) {
        this.page = page;
        this.bookBHDButton = page.getByRole('tab', { name: 'BHD Star Cineplex' });
        this.bookCGVButton = page.getByRole('tab', { name: 'cgv' });
        this.bookMEGAGSButton = page.getByRole('tab', { name: 'MegaGS' });
        this.headerBuypass = page.getByRole('heading', { name: 'Đặt vé thành công' });
        this.headerBuynologin = page.getByText('Bạn chưa đăng nhập×');
        this.headerBuynoselect = page.getByText('Bạn chưa chọn ghế×');
    }

    async selectTheatercompany(Theatercompany: string) {
        const theaterButton = this.page.getByRole('tab', { name: Theatercompany });
        await theaterButton.click();
    }

    async orderTicket() {
        const orderticket = this.page.getByRole('button', { name: 'ĐẶT VÉ' });
        await orderticket.click();
    }

}
