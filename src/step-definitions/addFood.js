const { Given, Then, When } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { config } = require('../../infrastructure/config');
const { dataTable } = require('../support/constants');

Then('I open {string} list', async function(btnName){  
    // waitUntil change: documentloaded => load
    await this.page.waitForURL(await this.page.url() + 'entity-dashboard', {waitUntil: 'load'});
    await this.page.locator(`text=${btnName}`).click();
});

Given('I select {string}', async function(btnName){   
    await this.page.locator(`text=${btnName}`).click();
});

Then('I add food details', async function(table){   
    const row = dataTable(table);

    await this.page.fill('input[name=product]', row.Product);
    await this.page.click('md-select-value');
    await this.page.click(`text=${row.Units}`)
    await this.page.fill('#amount', row.Amount);

    // await this.page.type('.tags > input', '          ');
    // await this.page.click('.suggestion-item >> text=Fruit');
});

Given('I add Nutrients', async function(table){   
    const row = dataTable(table);

    await this.page.fill('input[name=proteins]', row.Proteins);
    await this.page.fill('input[name=carbs]', row.Carbs);
    await this.page.fill('input[name=fats]', row.Fats);
    await this.page.fill('input[name=sugar]', row.Sugar);
    await this.page.fill('input[name=fiber]', row.Fiber);
    await this.page.fill('input[name=veggies]', row.Veggies);
    await this.page.fill('input[name=sodium]', row.Sodium);
});

Given('I add Additional Micro Nutrients', async function(table){   
    const row = dataTable(table);

    await this.page.click('button:has-text("Add nutrient")');
    await this.page.click(`#nutrientName`);
    await this.page.click(`md-option[ng-value=nutrient] :text("${row.Name}")`);
    await this.page.click(`#measurements`);
    await this.page.click(`md-option[ng-value=measurement] :text("${row.Measurement}")`);
    await this.page.click(`.md-dialog-container :text("+ Add")`);
    await this.page.fill('input[ng-model="nutrient.amount"]', row.Amount);
});

When('I save food', async function(){   
    await this.page.click('button#save-new-core-food-btn');
    await this.page.on('response', async res => {
        if (await res.url() === 'https://stage-api.lifebase.solutions/api/web/food/manual?type=core') {
            config.createdCoreFood = await res.json();
        }
    })
    await this.page.waitForSelector('.md-dialog-container', {state: 'visible'});
});

Then('I verify exists added food on page', async function(table){  
    const row = dataTable(table);
    const itemFood = await this.page.locator(`a[href="#!/edit-food/core/${config.createdCoreFood.id}"]`);
    await this.page.click('.close_icon');

    await expect(itemFood).toBeVisible();
    await expect(itemFood.locator('md-switch')).toHaveAttribute('aria-checked', row.StatusActive);
});

Given('I delete the food', async function(){  
    await this.page.click(`a[href="#!/edit-food/core/${config.createdCoreFood.id}"]`);
    await this.page.click('text=Delete');
    await this.page.click('md-dialog >> button:text("Delete")');
    await this.page.waitForSelector('md-dialog.saved-changes-dialog', {state: 'visible'});
});









