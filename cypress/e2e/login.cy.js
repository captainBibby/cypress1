/// <reference types="Cypress"/>

const locators = require("../fixtures/locators.json");

describe ("login test", () => {
    it ("login with valid credentials", () => {
        cy.visit("/");
        cy.get(locators.Header.loginButton).click();
        cy.get(locators.Common.emailInput).type("bibi@gmail.com");
        cy.get(locators.Common.passwordInput).type("1111111a");
        cy.get(locators.Common.submitButton).click();
    });

    it ("logout", () => {
        cy.get(locators.Header.logoutButton).should("have.length", 4); //ceka dok ne ucita 4 elementa
        cy.get(locators.Header.logoutButton).eq(3).click();
    });
});