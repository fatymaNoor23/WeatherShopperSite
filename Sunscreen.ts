const { Given, When, Then } = require('@wdio/cucumber-framework');
import assert from 'soft-assert';



Given('I am on the sunscreen page', async () => {
    await browser.url('https://weathershopper.pythonanywhere.com/sunscreen');
  });
  
  When('I select the least expensive sunscreen that is SPF-50', async () => {
    const sunscreen=await $(`//div/p[contains(@class,"font-weight-bold top-space-10")][contains(.,"SPF-50")][following::p[contains(.,"Price")]]`);
 
    const prices = await $$(`//div/p[contains(@class,"font-weight-bold top-space-10")][contains(.,"SPF-50")][following::p[contains(.,"Price")]]/following-sibling::p`);
    let  priceArray:any = [];
    
    for (let i = 0; i < prices.length; i++) {
      let element = prices[i];
      let priceText = await element.getText();
      let numericString = priceText.replace(/\D/g, '');
      let price = parseFloat(numericString);
      priceArray.push(price);
    }
    
    console.log(prices);
    let leastExpensive = await Math.min(...priceArray);
    console.log(leastExpensive);
    await expect(sunscreen).toHaveTextContaining("SPF-50");
    assert.softAssert("SPF-50","SPF-50","error",[]);
    assert.softAssertAll();
    
  });
  
  Then('the sunscreen should be added to my cart', async () => {
    const btn=await $(`//div/p[contains(@class,"font-weight-bold top-space-10")][contains(.,"SPF-50")][following::p[contains(.,"Price")]]/following-sibling::p/following-sibling::button`);
    await btn.click();
    await expect(btn).toBeClickable();
    await expect(btn).toHaveTextContaining('Add');
    
  });
  
  When('I select the least expensive sunscreen that is SPF-30', async () => {
    //select the sunblock that contains SPF-30 or spf-30 
    const sunBlock= await $(`//div/p[contains(@class,"font-weight-bold top-space-10")][contains(.,"SPF-30") or contains(.,"spf-30")][following::p[contains(.,"Price")]]`);
    //select the prices of those sunblocks
    let prices=await $$(`//div/p[contains(@class,"font-weight-bold top-space-10")][contains(.,"SPF-30") or contains(.,"spf-30")][following::p[contains(.,"Price")]]/following-sibling::p`);
    //least expensive sunblock that contains spf-30
    let  priceArray:any = [];
    
    for (let i = 0; i < prices.length; i++) {
      let element = prices[i];
      let priceText = await element.getText();
      let numericString = priceText.replace(/\D/g, '');
      let price = parseFloat(numericString);
      priceArray.push(price);
    }
    
    console.log(prices);
    let leastExpensive = await Math.min(...priceArray);
    console.log(leastExpensive);
    
    assert.softAssert("SPF-50","SPF-50","error",[]);
    assert.softAssertAll();

  });
  Then('the sunscreen should be added to the cart', async () => {
    const btn2=await $(`//div/p[contains(@class,"font-weight-bold top-space-10")][contains(.,"SPF-30") or contains(.,"spf-30")][following::p[contains(.,"Price")]]/following-sibling::p/following-sibling::button`);
    await btn2.click();
    await expect(btn2).toBeClickable();
    await expect(btn2).toHaveTextContaining('Add');
    
  });
  
  When('I click on the cart', async () => {
    //click on the cart
    let cart=await $(`//button[contains(@class,"thin-text nav-link")]`);
    await expect(cart).toBeClickable();
    await cart.click();
    

  });
  
  Then('I should be redirected to the cart page', async () => {
    //redirected to cartPage where we checkout 
    await expect(browser).toHaveUrlContaining('/cart');
  });