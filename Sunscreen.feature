Feature: Add two sunscreens to the cart

  Scenario: Add two sunscreens to the cart
    Given I am on the sunscreen page
    When I select the least expensive sunscreen that is SPF-50
    Then the sunscreen should be added to my cart
    When I select the least expensive sunscreen that is SPF-30
    Then the sunscreen should be added to the cart
    When I click on the cart
    Then I should be redirected to the cart page