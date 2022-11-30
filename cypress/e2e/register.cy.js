/// <reference types="Cypress"/>

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
        cy.get("a[href='/register']").click();
        cy.get('#first-name').type("David");
        cy.get('#last-name').type("Bibi");
        cy.get('#email').type(email);
        cy.get('#password').type("1111111a");
        cy.get('#password-confirmation').type("1111111a");
        //cy.get(".form-check-input").click();
        cy.get("input[type='checkbox']").check();
        cy.get("button").click();
        cy.url().should("not.include", "/register");
    })
})