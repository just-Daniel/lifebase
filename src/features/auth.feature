Feature: Login and Logout
    Background: 
        Given I open page on ui

    Scenario: I login and logout on page
        Given I login on page
            | Name     | Password  |
            | studying | Qwerty123 |
        And I confirm rules
        Then I logout