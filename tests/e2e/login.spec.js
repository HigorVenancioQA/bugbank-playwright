const { test, expect } = require('@playwright/test')
const { faker } = require('@faker-js/faker');
const { LoginPage } = require('../pages/LoginPage')

const { RegisterPage } = require('../pages/RegisterPage')

let loginPage
let registerPage
let leadEmail
let leadName
let password

test.beforeEach(async ({ page }) => {

    loginPage = new LoginPage(page)
    registerPage = new RegisterPage(page)
})

test.beforeAll(async () => {

    leadName = faker.person.fullName();
    leadEmail = faker.internet.email();
    password = faker.internet.password();
})

test('Login realizado com sucesso', async ({ page }) => {
    await loginPage.visit()

    await registerPage.submitRegister(leadEmail, leadName, password, password, false)
    await registerPage.closedModal()
    await loginPage.submitLogin(leadEmail, password)
    await loginPage.isLoggedIn(leadName)
});

test('Login sem sucesso', async ({ page }) => {
    await loginPage.visit()
    // Preencher campo Login sem ter feito o cadastro
    await loginPage.submitLogin('Higor@teste.com', '0000')
    // Validadador mensagem de erro
    await expect(page.locator('#modalText')).toHaveText(/Usuário ou senha inválido/)
})

test('Email invalido.', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submitLogin('Higorteste.com', '0000')
    await loginPage.alertFieldsLogin('email', 'Formato inválido')
})

test('Senha invalida.', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submitLogin('Higor@teste.com', '')
    await loginPage.alertFieldsLogin('password', 'É campo obrigatório')
});

test('Nenhum campo preenchido.', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submitLogin('', '')
    await page.getByRole('button', { name: 'Acessar' }).click();
    await loginPage.alertFieldsLogin('email', 'É campo obrigatório',)
    await loginPage.alertFieldsLogin('password', 'É campo obrigatório')
});
