const { request } = require("undici");
const { config } = require("../../infrastructure/config");
const { ADD_INGREDIENT, SEARCH_INGREDIENT, ITEM_INGREDIENT, SELECT_MEASUREMENT, AMOUNT_VALUE_INGREDIENT, AMOUNT_VEGGIES_VALUE_INGREDIENT, selectMeasurementValue, stateIsVegetable, selectIngredientSection, ADD_ITEM_BTN_INGREDIENT, SAVE_INGREDIENT } = require("../support/constants");

const addIngredients = async (table, page) => {
    for (let row of table.hashes()) {
        await page.click(ADD_INGREDIENT);
        await page.click(selectIngredientSection(row.Section))
        await page.fill(SEARCH_INGREDIENT, row.Name);
        await page.locator(ITEM_INGREDIENT, { hasText: row.Name }).first().locator(ADD_ITEM_BTN_INGREDIENT).click();
        await page.click(stateIsVegetable(row.IsVegetable));
        await page.click(SELECT_MEASUREMENT);
        await page.click(selectMeasurementValue(row.Measurement));
        await page.fill(AMOUNT_VALUE_INGREDIENT, row.Amount);
        if (row.IsVegetable === 'Yes' && !!row.VeggiesAmount) {
            await page.fill(AMOUNT_VEGGIES_VALUE_INGREDIENT, row.VeggiesAmount);
        }
        await page.click(SAVE_INGREDIENT);
    }
}

const findRecipeOnPage = async (pageInfo) => {
    config.recipeCurrentPage = pageInfo.page.currentPage;
    config.recipeCountPages = pageInfo.page.count;
    config.recipesItems = pageInfo.items;

    for (config.recipeCurrentPage; config.recipeCurrentPage < config.recipeCountPages; config.recipeCurrentPage++) {
        if (config.recipeCurrentPage) {
            const res = await request(`https://stage-api.lifebase.solutions/api/recipes?owners=all&page=${config.recipeCurrentPage}`, {
                method: 'GET',
                headers: {
                    cookie: config.cookieToAccess
                }
            })
            config.recipesItems = (await res.body.json()).items;
        }

        const recipeExistsOnPage = config.recipesItems.some(item => item.id === config.recipeCreatedItem.id);

        if (recipeExistsOnPage) {
            return recipeExistsOnPage;
        }
    }
}

module.exports = {
    addIngredients,
    findRecipeOnPage
}