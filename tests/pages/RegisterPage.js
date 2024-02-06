const { expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');

export class RegisterPage {

    constructor(page) {
        this.page = page
    }

    async submitRegister(email, name, password, passwordConfirmation,saldo) {

        await this.page.getByRole('button', { name: 'registrar' }).click()
        await this.page.locator('div.card__register input[name="email"]').fill(email)
        await this.page.locator('div.card__register input[name="name"]').fill(name)
        await this.page.locator('div.card__register input[name="password"]').fill(password)
        await this.page.locator('div.card__register input[name="passwordConfirmation"]').fill(passwordConfirmation)
        if (saldo){
        await this.page.locator('#toggleAddBalance').click()
        }

        await this.page.getByRole('button', { name: 'Cadastrar' }).click();
        
    }

    async closedModal(){

    await this.page.click("#btnCloseModal")
    }

    async alertFieldsRegister(name, target) {
        await expect(this.page.locator(`input[name=${name}] + p.input__warging`).nth(1)).toHaveText(target)
    }

    async alertName(){
        await expect(this.page.locator('#modalText').filter({hasText: 'Nome não pode ser vazio.'})).toBeVisible()
    }

    async alertConfirmationSenha(target) {
        await expect(this.page.locator('input[name="passwordConfirmation"] + p.input__warging')).toHaveText(target)
    }
}