Feature: Add Recipe
    Background:
        Given I open page on ui

    Scenario: Add Cracker  to recipe list
        Given I login on page
            | Name | Password  |
            | zib  | Qwerty123 |
        Then I open "Recipes" list
        And I add recipe details
            | Name    | Servings | Amount | Measurements | Img                  | Instruction                                             |
            | Cracker | 4        | 1      | Cracker      | public/crackers.jpeg | Heat the oven to 450°F: Place a rack in the lower third of the oven and heat to 450°F. Sprinkle a baking sheet lightly with flour and set aside. \n\n Mix together the dry ingredients: In a medium bowl, whisk together the flour, sugar, and salt. Add the oil and water: Add the oil and water to the flour mixture. Stir until a soft, sticky dough is formed. If a lot of loose flour remains in the bottom of the bowl and the surface of the dough, add more water a tablespoon at a time until all the flour is incorporated. \n\n Divide and shape the dough into a square: Divide the dough into two halves and set one half aside. Sprinkle your work surface lightly with flour and set the other half on top. Pat it into a thick square with your hands. Roll out the dough: Working from the center of the dough out, roll the dough into a rectangle roughly 1/8-inch thick or thinner. If the dough starts to shrink back as you roll it, let it rest, uncovered, for 5 minutes and then continue rolling. \n\n Sprinkle dough with topping (optional): Brush the surface of the dough very lightly with water. Combine the seeds in a small bowl and sprinkle half of them (roughly 1 1/2 tablespoons) evenly over the surface of the dough. See Additional Notes below for additional ideas for toppings and flavorings. Cut the dough into cracker-sized rectangles: Using a pizza cutter or a sharp knife, cut the dough into individual crackers roughly 1-inch by 2-inches. Alternatively, cut the crackers into squares, diamonds, or use cookie cutters. \n\n Transfer crackers to baking sheet and prick with fork: Transfer the crackers to the baking sheet using a metal dough scraper or spatula. It's fine to crowd the crackers very close to each other. Prick each cracker with the tines of a fork to prevent them from puffing during baking. \n\n Bake for 12-15 minutes: Bake the crackers in the oven for 12-15 minutes, until the edges are browned. Thinner crackers will bake more quickly than thicker ones; you can remove the crackers as they brown to your liking and continue baking the rest. While the first batch of crackers is baking, roll out and cut the remaining dough. \n\n Cool and store the crackers: Transfer the baked crackers to a wire rack to cool completely. The crackers will crisp further as they cool. Store the crackers in an airtight container on the counter for 3-5 days. If you're crackers are a little old and less-than-crispy, lay them on a baking sheet and put them in a 350°F oven for a few minutes to re-crisp. |
        And I add Ingredients
            | Section       | Name                    | IsVegetable | VeggiesAmount | Measurement       | Amount | 
            | Core          | Flour                   | No          |               | cup               | 3      | 
            | Veggies       | Water                   | Yes         | 10            | cup               | 4      |
            | Supplement    | Sesame seeds            | No          |               | tbsp              | 1      |
        Then I save recipe
        And I verify exists recipe on page
            | StatusActive |
            | true         |
        And I delete the recipe