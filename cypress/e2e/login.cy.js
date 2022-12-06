/// <reference types="Cypress"/>

import { faker } from '@faker-js/faker';

const locators = require("../fixtures/locators.json");

let invalidData = {
    invalidEmail: faker.internet.email(),
    invalidPassword: faker.internet.password()
  };

describe ("login test", () => {

    beforeEach ("visit login page", () => {
        cy.visit("/");
        cy.get(locators.Header.loginButton).click();
    });

    it ("negative case / login with invalid email", () => {
        cy.get(locators.Common.emailInput).type(invalidData.invalidEmail);
        cy.get(locators.Common.passwordInput).type("1111111a");
        cy.get(locators.Common.submitButton).click();
    });

    it ("negative case / login with invalid password", () => {
        cy.get(locators.Common.emailInput).type("bibi@gmail.com");
        cy.get(locators.Common.passwordInput).type(invalidData.invalidPassword);
        cy.get(locators.Common.submitButton).click();
    })

    it ("negative case / login with invalid credentials", () => {
        cy.get(locators.Common.emailInput).type(invalidData.invalidEmail);
        cy.get(locators.Common.passwordInput).type(invalidData.invalidPassword);
        cy.get(locators.Common.submitButton).click();
    })

    it ("login with valid credentials", () => {
        cy.get(locators.Common.emailInput).type("bibi@gmail.com");
        cy.get(locators.Common.passwordInput).type("1111111a");
        cy.get(locators.Common.submitButton).click();
        cy.get(locators.Header.logoutButton).should("have.length", 4); //ceka dok ne ucita 4 elementa
        cy.get(locators.Header.logoutButton).eq(3).click(); 
    });
});
