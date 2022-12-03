/// <reference types="Cypress"/>

const locators = require("../fixtures/locators.json");

function makeId(length) {
  var result = "";
  var characters =
    "abcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(
      Math.floor(Math.random() * charactersLength)
    );
  }
  return result;
}

let email = `${makeId(5)}@test.com`;

describe("registration test", () => {

  beforeEach ("visit gallery app", () => {
    cy.visit("/");
    cy.get(locators.Register.registerButton).click();
  });

  it ("register without email", () => {
    cy.get(locators.Register.firstNameInput).type("David");
    cy.get(locators.Register.lastNameInput).type("Bibic");
    cy.get(locators.Common.passwordInput).type("1234567a");
    cy.get(locators.Register.passwordConfirmInput).type("1234567a");
    cy.get(locators.Register.checkbox).check();
    cy.get(locators.Common.submitButton).click();
    cy.url().should("not.include", "/register");
  });

  it ("register with invalid email format", () => {
    cy.get(locators.Register.firstNameInput).type("David");
    cy.get(locators.Register.lastNameInput).type("Bibic");
    cy.get(locators.Common.emailInput).type("blabla");
    cy.get(locators.Common.passwordInput).type("1234567a");
    cy.get(locators.Register.passwordConfirmInput).type("1234567a");
    cy.get(locators.Register.checkbox).check();
    cy.get(locators.Common.submitButton).click();
    cy.url().should("not.include", "/register");
  });

  it ("register without password", () => {
    cy.get(locators.Register.firstNameInput).type("David");
    cy.get(locators.Register.lastNameInput).type("Bibic");
    cy.get(locators.Common.emailInput).type(email);
    cy.get(locators.Common.passwordInput).type("1234567a");
    cy.get(locators.Register.checkbox).check();
    cy.get(locators.Common.submitButton).click();
    cy.url().should("not.include", "/register");
  });

  it ("register without password confirmation", () => {
    cy.get(locators.Register.firstNameInput).type("David");
    cy.get(locators.Register.lastNameInput).type("Bibic");
    cy.get(locators.Common.emailInput).type(email);
    cy.get(locators.Common.passwordInput).type("1234567a");
    cy.get(locators.Register.checkbox).check();
    cy.get(locators.Common.submitButton).click();
    cy.url().should("not.include", "/register");
  });

  it ("register with sufficient password characters", () => {
    cy.get(locators.Register.firstNameInput).type("David");
    cy.get(locators.Register.lastNameInput).type("Bibic");
    cy.get(locators.Common.emailInput).type(email);
    cy.get(locators.Common.passwordInput).type("123aaa");
    cy.get(locators.Common.passwordInput).type("123aaa");
    cy.get(locators.Register.checkbox).check();
    cy.get(locators.Common.submitButton).click();
    cy.url().should("not.include", "/register");
  });

  it ("register without checking checkbox", () => {
    cy.get(locators.Register.firstNameInput).type("David");
    cy.get(locators.Register.lastNameInput).type("Bibic");
    cy.get(locators.Common.emailInput).type(email);
    cy.get(locators.Common.passwordInput).type("123aaa");
    cy.get(locators.Common.passwordInput).type("123aaa");
    cy.get(locators.Common.submitButton).click();
    cy.url().should("not.include", "/register");
  });

  it("register with valid data", () => {
    cy.get(locators.Register.firstNameInput).type("David");
    cy.get(locators.Register.lastNameInput).type("Bibi");
    cy.get(locators.Common.emailInput).type(email);
    cy.get(locators.Common.passwordInput).type("1111111a");      cy.get(locators.Register.passwordConfirmInput).type("1111111a");
    cy.get(locators.Register.checkbox).check();
    cy.get(locators.Common.submitButton).click();
    cy.url().should("not.include", "/register");
  });
});