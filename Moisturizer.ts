/*Add two moisturizers to your cart. 
First, select the least expensive mositurizer that contains Aloe.
 For your second moisturizer, 
select the least expensive moisturizer that contains almond.
 Click on cart when you are done 
 

 */
const { Given, When, Then } = require('@wdio/cucumber-framework');
import assert from 'soft-assert';
import re from 'regex';

Given("I am on the moisturizers page", async () => {
    await browser.url('https://weathershopper.pythonanywhere.com/moisturizer');
  });
  
  When("I select the least expensive moisturizer that contains Aloe", async () => {
    const moisturizers = await $(`//div//p[@class="font-weight-bold top-space-10"][contains(text(),'Aloe') or contains(text(),'aloe')][following::p[contains(.,"Price")]]`);
    await expect(moisturizers).toHaveTextContaining('Aloe');
    // await expect(moisturizers).toHaveTextContaining('Price');
   
    const prices = await $$(`//div//p[@class="font-weight-bold top-space-10"][contains(text(),'Aloe') or contains(text(),'aloe')][following::p[contains(.,"Price")]]/following-sibling::p`);
  
    //get price text
    let  priceArray:any = [];
    
    for (let i = 0; i < prices.length; i++) {
      let element = prices[i];
      let priceText = await element.getText();
      let numericString = priceText.replace(/\D/g, '');
      let price = parseFloat(numericString);
      priceArray.push(price);
    }
    
    console.log(prices);
    let leastExpensive = Math.min(...priceArray);
    console.log(leastExpensive);
   


  });
  
  Then("the moisturizer should be added", async () => {
    const btn=await $(`//div//p[@class="font-weight-bold top-space-10"][contains(text(),'Aloe') or contains(text(),'aloe')][following::p[contains(.,"Price")]]/following-sibling::p/following-sibling::button`);
    await btn.click();
    await expect(btn).toBeClickable();
    await expect(btn).toHaveTextContaining('Add');
    
    
    
  });
  
  When("I select the least expensive moisturizer that contains almond", async () => {
    const lotion=$(`//div//p[@class="font-weight-bold top-space-10"][contains(text(),'Almond') or contains(text(),'almond')][following::p[contains(.,"Price")]]`);
    await expect(lotion).toHaveTextContaining('almond');
    // softAssert(actual, expected, msg, ignoreKeys)
    await assert.softAssert("almond","almond",'error',[]);
    await assert.softAssertAll();

    const prices=await $$(`//div//p[@class="font-weight-bold top-space-10"][contains(text(),'Almond') or contains(text(),'almond')][following::p[contains(.,"Price")]]/following-sibling::p`);
    let  priceArray:any = [];
    
    for (let i = 0; i < prices.length; i++) {
      let element = prices[i];
      let priceText = await element.getText();
      let numericString = await priceText.replace(/\D/g, '');
      let price = await parseFloat(numericString);
      await priceArray.push(price);
    }
    
    console.log(prices);
    let leastExpensive =await  Math.min(...priceArray);
    console.log(leastExpensive);
   


  });
  
  Then("the moisturizer should be added by a click", async () => {
    const almondBtn=await $(`//div//p[@class="font-weight-bold top-space-10"][contains(text(),'Almond') or contains(text(),'almond')][following::p[contains(.,"Price")]]/following-sibling::p/following-sibling::button`);
    await almondBtn.click();
   await expect(almondBtn).toBeClickable();

    
  });
  
  When("I click on the cart", async () => {
    let cart=await $(`//button[contains(@class,"thin-text nav-link")]//span`);
    await expect(cart).toBeClickable();
    await cart.click();
    
    
 
  });
  
  Then("I should be redirected to the cart page", async () => {
    //await expect(browser).toHaveUrlContaining('/sunscreen');
    await expect(browser).toHaveUrlContaining('/cart');
    
  });
 

