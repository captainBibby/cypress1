/// <reference types="Cypress"/>

import {navigation} from './page_objects/navigation'
import {loginPage} from './page_objects/loginPage'

describe ("login test", () => {

    beforeEach ("login test", () => {
        cy.visit("/");
        loginPage.loginHeading.should("be.visible")
        .and("have.text", "Please login");
    })

    it.only ("login with invalid email", () => {
        loginPage.login("error@gmail.com", "1111111a");
        loginPage.alertMessage.should("be.visible");
        loginPage.alertMessage.should("have.text", "Bad Credentials");
        loginPage.alertMessage.should(
        "have.css",
        "background-color:", 
        "rgb(114, 28, 36)"
        );
        cy.url().should("include", "login");
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
