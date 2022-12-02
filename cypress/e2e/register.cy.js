/// <reference types="Cypress"/>

const locators = require("../fixtures/locators.json");

describe("registration test", () => {

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

    it("register with valid data", () => {
        cy.visit("/");
        cy.get(locators.Register.registerButton).click();
        cy.get(locators.Register.firstNameInput).type("David");
        cy.get(locators.Register.lastNameInput).type("Bibi");
        cy.get(locators.Common.emailInput).type(email);
        cy.get(locators.Common.passwordInput).type("1111111a");
        cy.get(locators.Register.passwordConfirmInput).type("1111111a");
        cy.get(locators.Register.checkbox).check();
        cy.get(locators.Common.submitButton).click();
        cy.url().should("not.include", "/register");
    })
});