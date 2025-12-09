import { Page } from "@playwright/test";


export class HomePage {
    constructor(page: Page) {
        this.page = page;
    }
    page: Page;
}