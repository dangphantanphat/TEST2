import { Page, Locator, expect } from '@playwright/test';

export class Clickmoive {

    readonly the: Locator;

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        this.the = page.getByRole('button', { name: 'video-button' }).first();
    }

    // Hàm chung để tìm thẻ phim (Movie Card) theo tên
    private getMovieCard(movieName: string) {
        // Filter tìm đúng thẻ có chứa tên phim
        return this.page.locator('.movie-item, .card').filter({ hasText: movieName }).first();
    }

    //Xem Trailer
    async openTrailer(movieName: string ) {
        await this.the.click();
        const movieCard = this.getMovieCard(movieName);
        const playButton = movieCard.locator('.play, .icon-play, button:has-text("Play")').first();
        // 4. Wait cho Modal hiện ra
        const trailerModal = this.page.locator('.modal, .iframe-container, [role="dialog"]').first();
        await expect(trailerModal).toBeVisible({ timeout: 10000 });
        return trailerModal;
    }

}

