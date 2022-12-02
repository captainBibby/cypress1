/// <reference types="Cypress"/>

const locators = require("../fixtures/locators.json");

describe ("login test", () => {
    it ("login with valid credentials", () => {
        cy.visit("/");
        cy.get(locators.Login.loginButton).click();
        cy.get(locators.Common.emailInput).type("bibi@gmail.com");
        cy.get(locators.Common.passwordInput).type("1111111a");
        //cy.get('button').click();
        cy.get(locators.Common.submitButton).click();
    });

    it ("logout", () => {
        //cy.wait(500);
        cy.get(".nav-link").should("have.length", 4); //ceka dok ne ucita 4 elementa
        cy.get(".nav-link").eq(3).click();
    });

});
