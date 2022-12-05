/// <reference types="Cypress"/>

import { faker } from '@faker-js/faker';

let userData = {
  userEmail: faker.internet.email(),
  userPassword: faker.internet.password(),
  userFirstName: faker.name.firstName(),
  userLastName: faker.name.lastName()
};

const locators = require("../fixtures/locators.json");

describe("registration test", () => {

  beforeEach ("visit gallery app", () => {
    cy.visit("/");
    cy.get(locators.Register.registerButton).click();
  });

  it ("register without email", () => {
    cy.get(locators.Register.firstNameInput).type(userData.userFirstName);
    cy.get(locators.Register.lastNameInput).type(userData.userLastName);
    cy.get(locators.Common.passwordInput).type(userData.userPassword);
    cy.get(locators.Register.passwordConfirmInput).type(userData.userPassword);
    cy.get(locators.Register.checkbox).check();
    cy.get(locators.Common.submitButton).click();
  });

  it ("register with invalid email format", () => {
    cy.get(locators.Register.firstNameInput).type(userData.userFirstName);
    cy.get(locators.Register.lastNameInput).type(userData.userLastName);
    cy.get(locators.Common.emailInput).type("blabla");
    cy.get(locators.Common.passwordInput).type(userData.userPassword);
    cy.get(locators.Register.passwordConfirmInput).type(userData.userPassword);
    cy.get(locators.Register.checkbox).check();
    cy.get(locators.Common.submitButton).click();
  });

  it ("register without password", () => {
    cy.get(locators.Register.firstNameInput).type(userData.userFirstName);
    cy.get(locators.Register.lastNameInput).type(userData.userLastName);
    cy.get(locators.Common.emailInput).type(userData.userEmail);
    cy.get(locators.Register.passwordConfirmInput).type(userData.userPassword);
    cy.get(locators.Register.checkbox).check();
    cy.get(locators.Common.submitButton).click();
  });

  it ("register without password confirmation", () => {
    cy.get(locators.Register.firstNameInput).type(userData.userFirstName);
    cy.get(locators.Register.lastNameInput).type(userData.userLastName);
    cy.get(locators.Common.emailInput).type(userData.userEmail);
    cy.get(locators.Common.passwordInput).type(userData.userPassword);
    cy.get(locators.Register.checkbox).check();
    cy.get(locators.Common.submitButton).click();
  });

  it ("register with insufficient password characters", () => {
    cy.get(locators.Register.firstNameInput).type(userData.userFirstName);
    cy.get(locators.Register.lastNameInput).type(userData.userLastName);
    cy.get(locators.Common.emailInput).type(userData.userEmail);
    cy.get(locators.Common.passwordInput).type("123aaa");
    cy.get(locators.Register.passwordConfirmInput).type("123aaa");
    cy.get(locators.Register.checkbox).check();
    cy.get(locators.Common.submitButton).click();
  });

  it ("register without checking checkbox", () => {
    cy.get(locators.Register.firstNameInput).type(userData.userFirstName);
    cy.get(locators.Register.lastNameInput).type(userData.userLastName);
    cy.get(locators.Common.emailInput).type(userData.userEmail);
    cy.get(locators.Common.passwordInput).type(userData.userPassword);
    cy.get(locators.Register.passwordConfirmInput).type(userData.userPassword);
    cy.get(locators.Common.submitButton).click();
  });

  it("register with valid data", () => {
    cy.get(locators.Register.firstNameInput).type(userData.userFirstName);
    cy.get(locators.Register.lastNameInput).type(userData.userLastName);
    cy.get(locators.Common.emailInput).type(userData.userEmail);
    cy.get(locators.Common.passwordInput).type(userData.userPassword);
    cy.get(locators.Register.passwordConfirmInput).type (userData.userPassword);
    cy.get(locators.Register.checkbox).check();
    cy.get(locators.Common.submitButton).click();
    cy.url().should("not.include", "/register");
  });
});