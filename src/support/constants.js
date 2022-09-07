const dataTable = table => table.hashes()[0];
const ADD_INGREDIENT = 'text=Add ingredient';
const SEARCH_INGREDIENT = 'input[name=searchQuickAdd]';
const ITEM_INGREDIENT = '.food-item';
const ADD_ITEM_BTN_INGREDIENT = '.food_item_add_btn';
const SELECT_MEASUREMENT = `#selectMeasurement`;
const AMOUNT_VALUE_INGREDIENT = `#amountValue`;
const AMOUNT_VEGGIES_VALUE_INGREDIENT = `#veggiesAmountValue`;
const SAVE_INGREDIENT = `.btns-container :text("Add")`;
const selectMeasurementValue = measurement => `md-content[aria-label=Measurement] :text("${measurement}")`;
const stateIsVegetable = isVegetable => `text=${isVegetable}`;
const selectIngredientSection = section => `.all-food-body :text("${section}")`;

module.exports = {
    dataTable,
    selectMeasurementValue,
    stateIsVegetable,
    selectIngredientSection,
    ADD_INGREDIENT,
    SEARCH_INGREDIENT,
    ITEM_INGREDIENT,
    ADD_ITEM_BTN_INGREDIENT,
    SELECT_MEASUREMENT,
    AMOUNT_VALUE_INGREDIENT,
    AMOUNT_VEGGIES_VALUE_INGREDIENT,
    SAVE_INGREDIENT
}