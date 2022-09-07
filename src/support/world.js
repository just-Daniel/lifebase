const { setWorldConstructor, setDefaultTimeout } = require("@cucumber/cucumber");
const playwright = require('playwright');

setDefaultTimeout(60 * 1000);

class CustomWorld {
    async openUrl(url) {
        const browser = await playwright.chromium.launch({
            headless: false,
        });
        const context = await browser.newContext();
        this.page = await context.newPage();
        await this.page.goto(url);
    }     
}

setWorldConstructor(CustomWorld);