const { test, expect } = require('@playwright/test')
const { LoginPage } = require('../pages/LoginPage')
const { faker } = require('@faker-js/faker');
const { RegisterPage } = require('../pages/RegisterPage')

let registerPage
let loginPage
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


test('Usuario cadastrado com sucesso e com saldo', async ({ page }) => {
    //visit
    await loginPage.visit()
    await registerPage.submitRegister(leadEmail, leadName, password, password, true)
})

test('Usuario cadastrado com sucesso sem saldo', async ({ page }) => {
    //visit
    await loginPage.visit()
    await registerPage.submitRegister(leadEmail, leadName, password, password, false)
})

test('Não cadastra, sem preencher o campo E-mail ', async ({ page }) => {
    //visit
    await loginPage.visit()
    await registerPage.submitRegister('', leadName, password, password)
    await registerPage.alertFieldsRegister('email', 'É campo obrigatório')
})

test('Não cadastra, sem preencher o campo Name', async ({ page }) => {
    //visit
    await loginPage.visit()
    await registerPage.submitRegister(leadEmail, '', password, password)
    await registerPage.alertName()
})

test('Não cadastra, sem preencher o campo Senha', async ({ page }) => {
    //visit
    await loginPage.visit()
    await registerPage.submitRegister(leadEmail, leadName, '', password)
    await registerPage.alertFieldsRegister('password', 'É campo obrigatório')
})

test('Não cadastra, sem preencher o campo Confirmação de senha', async ({ page }) => {
    //visit
    await loginPage.visit()
    await registerPage.submitRegister(leadEmail, leadName, password, '')
    await registerPage.alertConfirmationSenha('É campo obrigatório')
})

test('Não cadastra, sem preencher todos os campos', async ({ page }) => {
    //visit
    await loginPage.visit()
    await registerPage.submitRegister('', '', '', '')
    await registerPage.alertFieldsRegister('email', 'É campo obrigatório')
    await registerPage.alertFieldsRegister('password', 'É campo obrigatório')
    await registerPage.alertConfirmationSenha('É campo obrigatório')
})
