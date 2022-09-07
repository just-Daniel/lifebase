const { Given, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { config } = require("../../infrastructure/config");
const { addIngredients, findRecipeOnPage } = require("../services/recipe");
const { dataTable } = require("../support/constants");

Given('I add recipe details', async function(table){   
    const row = dataTable(table);

    await this.page.click('#add-new-recipe-btn');
    await this.page.fill('input[name=recipeName]', row.Name);
    await this.page.fill('input[name=servingSize]', row.Servings);
    await this.page.fill('input[name=amount]', row.Amount);
    await this.page.click('md-select[name=measurement]');
    await this.page.click(`md-option[value=${row.Measurements}]`);

    if (!!row.Img) {
        const [fileChooser] = await Promise.all([
            this.page.waitForEvent('filechooser'),
            await this.page.click(`.upload-recipe-image-btn`)
        ]);
        await fileChooser.setFiles(row.Img);
    }

    await this.page.fill('textarea[name=description]', row.Instruction);
});

Given('I add Ingredients', async function(table){   
    await addIngredients(table, this.page);
});

Then('I save recipe', async function () {
    await this.page.click('#save-new-recipe-btn');

    const [recipeItem] = await Promise.all([
        this.page.waitForEvent('response')
    ]);
    config.recipeCreatedItem = await recipeItem.json();
})

Given('I verify exists recipe on page', async function(table) {
    const row = dataTable(table);

    const [allRecipesOnPage] = await Promise.all([
        this.page.waitForResponse('https://stage-api.lifebase.solutions/api/recipes?owners=all'),
        await this.page.waitForSelector('text=My Recipes', {state: 'visible'})
    ]);

    expect(await findRecipeOnPage((await allRecipesOnPage.json()))).toBeTruthy();
    await this.page.click(`pagination :text("${config.recipeCurrentPage + 1}")`);
    const recipeItem = await this.page.locator(`a[href="#!/edit-recipe/${config.recipeCreatedItem.id}"]`);
    await expect(recipeItem).toBeVisible();
    await expect(recipeItem.locator('md-switch')).toHaveAttribute('aria-checked', row.StatusActive);
})

Given('I delete the recipe', async function(){   
    await this.page.click(`a[href="#!/edit-recipe/${config.recipeCreatedItem.id}"]`);
    await this.page.click('text=Delete');
    await this.page.waitForSelector('.list', {state: 'visible'});
});
