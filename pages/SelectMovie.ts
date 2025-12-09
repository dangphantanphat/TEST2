// pages/HomePage.ts
import { Page, Locator, expect } from '@playwright/test';

export class SelectMovie {

    readonly page: Page;
    readonly bookButton: Locator;
    private readonly btnTrailer: Locator;

    constructor(page: Page) {
        this.page = page;
        this.bookButton = page.locator('button:has-text("ĐẶT VÉ")');
        this.btnTrailer = this.page.getByRole('button', { name: 'video-button' });

    }

    // async selectTrailer() {
    //     await this.btnTrailer.click({ force: true });
    // }

}