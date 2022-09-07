const { Given, Then } = require('@cucumber/cucumber');
const { config } = require('../../infrastructure/config');
const { dataTable } = require('../support/constants');

Given('I open page on ui', async function(){   
    await this.openUrl('https://stage-dashboard.lifebase.solutions/#!/');
});

Given('I login on page', async function(table) {
  const row = dataTable(table);

  await this.page.locator('input[id=input_0]').fill(row.Name);
  await this.page.locator('input[id=input_1]').fill(row.Password);
  await this.page.locator('button.sign-in-form__submit').click();

  await this.page.on('response', async res => {
    if (await res.url() === 'https://stage-api.lifebase.solutions/api/cookie-login') {

    const headerItems = await res.headersArray();
    const allCookies = headerItems.find(item => item.name === 'set-cookie').value;
    const cookiesItems = allCookies.split('; ');
    config.cookieToAccess = cookiesItems.find(item => item.includes('food-code')) + ';';
    }
  })
});

Given('I confirm rules', async function() {

})

Then('I logout', async function(){

  await this.page.locator('button.header-user-info').click();
  await this.page.locator('text=Logout').click();
})