const { expect } = require('@playwright/test');

export class LoginPage {

    constructor(page) {
        this.page = page
    }
    async visit() {
        await this.page.goto('https://bugbank.netlify.app/')

    }


    async submitLogin(name, password) {

        await this.page.locator('div.card__login input[name="email"]').fill(name)
        await this.page.locator('div.card__login input[name="password"]').fill(password)
        await this.page.getByRole('button', { name: 'Acessar' }).click();
    }

    async alertHaveText(target) {
        await expect(this.page.locator('.kOeYBn > .input__warging')).toHaveText(target)
    }

    async isLoggedIn(name) {

        await this.page.waitForLoadState('networkidle') 
        await expect(this.page.locator('#textName')).toHaveText(`Olá ${name},`);
    }

    async alertFieldsLogin(name, target) {
        await expect(this.page.locator(`input[name=${name}] + p.input__warging`).nth(0)).toHaveText(target)
    }

}