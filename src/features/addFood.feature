Feature: Add Food
    Background:
        Given I open page on ui

    Scenario: Add apple to food list
        Given I login on page
            | Name | Password  |
            | zib  | Qwerty123 |
        Then I open "Add foods" list
        And I select "Add new core food"
        Then I add food details
            | Product | Units            | Amount | Tags  |
            | Apple   | Large size fruit | 1      | Fruit |
        And I add Nutrients
            | Proteins | Carbs | Fats | Sugar | Fiber | Veggies | Sodium |
            | 1        | 34    | 0    | 25    | 5     | 0       | 0      |
        And I add Additional Micro Nutrients
            | Name | Measurement | Amount |
            | Iron | mg          | 0.35   |
        When I save food
        Then I verify exists added food on page
            | StatusActive |
            | true         |
        And I delete the food
