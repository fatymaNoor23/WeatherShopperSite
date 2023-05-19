Feature: Add two moisturizers to your cart

Scenario: Add two moisturizers to your cart

Given I am on the moisturizers page
When I select the least expensive moisturizer that contains Aloe
Then the moisturizer should be added 
When I select the least expensive moisturizer that contains almond
Then the moisturizer should be added by a click
When I click on the cart
Then I should be redirected to the cart page
