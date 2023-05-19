/*Feature: Shop for moisturizers and sunscreens

As a customer
I want to be able to shop for moisturizers and sunscreens
So that I can protect my skin from the elements

Background:

Given I am on the weather shopper website

Scenario: Shop for moisturizers when the weather is below 19 degrees

When the weather is below 19 degrees
Then I should be taken to the moisturizers page

#Scenario: Shop for sunscreens when the weather is above 34 degrees

#When the weather is above 34 degrees
#Then I should see a list of sunscreens
// #And I should be able to add sunscreens to my cart*/
// 

const { Given, When, Then } = require('@wdio/cucumber-framework');
import assert from 'soft-assert';

Given("I am on the weather shopper website", async () => {
  await browser.url('https://weathershopper.pythonanywhere.com/');
});

When("the weather is below 19 degrees", async () => {
  const tempElement = await $("#temperature");
  const temp = await (tempElement.getText());
  let tempValue = parseInt(temp);
  console.log(tempValue); // Display the value of temp in the console

  // Example assertion: temperature is less than or equal to 19
  await expect(tempValue).toBeLessThan(19);
});
When("the weather is above 34 degrees", async () => {
  const tempElement = await $("#temperature");
  const temp = await tempElement.getText();
  let tempValue = parseInt(temp);
  console.log(tempValue); // Display the value of temp in the console

  // Example assertion: temperature is greater than 34
  await expect(tempValue).toBeGreaterThan(34);
});

// Then("I should be taken to the moisturizers page", async () => {
//     const btn=(await $(`//a[@href="/sunscreen"]`)).waitForEnabled({reverse:true})
// //   const currentUrl = await browser.getUrl();
//   const Button=$(`//a[@href="/moisturizer"]`);
// const btnText = await Button.getText();
// let click = await Button.click();
// await expect(click).toHaveUrlContaining('./moisturizer');

// assert.ok(btnText !== '', "error");
// assert.softAssert(btn,"true","error",[])


// });
Then("I should be taken to the moisturizers page", async () => {

  // const currentUrl = await browser.getUrl();
  const Button = $(`//a[@href="/moisturizer"]`);

  await Button.click();

  await expect(browser).toHaveUrlContaining('/moisturizer');

});
Then("I should be taken to the sunscreens page", async () => {
  //   const currentUrl = await browser.getUrl();

  // const currentUrl = await browser.getUrl();
  const Button = $(`//a[@href="/sunscreen"]`);
  // const btnText = await Button.getText();
  await Button.click();

  await expect(browser).toHaveUrlContaining('/sunscreen');



});

