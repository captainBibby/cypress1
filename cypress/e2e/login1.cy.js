/// <reference types="Cypress"/>

import {navigation} from './page_objects/navigation'
import {loginPage, LoginPage} from './page_objects/loginPage'

describe ("login test", () => {

    beforeEach (() => {
        cy.visit("/");
        navigation.clickLoginButton()
    })

    it ("login with invalid email", () => {
        loginPage.login("error@", "1111111a")
    })

    it ("login with invalid password", () => {
        loginPage.login("bibi@gmail.com", "1234te")
    })

    it ("login with invalid credentials", () => {
        loginPage.login("unknown@gmail.com", "1234test")
    })

    it ("login with valid credentials", () => {
        loginPage.login("bibi@gmail.com", "1111111a");
        navigation.clickLogoutButton()
    });
});
