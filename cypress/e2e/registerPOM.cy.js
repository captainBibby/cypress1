/// <reference types="Cypress" />

import { faker } from "@faker-js/faker";
import { registerPage } from "./page_objects/registerPage";
import { loginPage } from "./page_objects/loginPage";

describe("register POM", () => {
  let randomUser = {
    randomEmail: faker.internet.email(),
    randomFirstName: faker.name.firstName(),
    randomLastName: faker.name.lastName(),
    randomPassword: faker.internet.password(),
    validEmail: "bibi@gmail.com",
    wrongPasswordConfirmation: faker.internet.password()
  };

  beforeEach("visit register page", () => {
    cy.visit("/register");
    cy.url().should("include", "/register");
  });

  it("register with invalid email address", () => {
    registerPage.register(
      randomUser.randomFirstName,
      randomUser.randomLastName,
      randomUser.randomEmail,
      randomUser.randomPassword,
      randomUser.randomPassword
    );
    cy.url().should("include", "/register");
  });

  it("register with existing email", () => {
    registerPage.register(
      randomUser.randomFirstName,
      randomUser.randomLastName,
      randomUser.validEmail,
      randomUser.randomPassword,
      randomUser.randomPassword
    );
    registerPage.alertMessage.should("be.visible");
    registerPage.alertMessage.should("have.text", "The email has already been taken.");
    registerPage.alertMessage.should(
        "have.css",
        "background-color", 
        "rgb(248, 215, 218)");
    cy.url().should("include", "/register");
  });

  it("register with wrong password confirmation", () => {
    registerPage.register(
      randomUser.randomFirstName,
      randomUser.randomLastName,
      randomUser.randomEmail,
      randomUser.randomPassword,
      randomUser.wrongPasswordConfirmation,
    );
    registerPage.alertMessage
    .should("be.visible")
    .and("exist")
    .and("have.length",1)
    .and("have.text", "The password confirmation does not match.");
    registerPage.alertMessage.should(
        "have.css",
        "background-color", 
        "rgb(248, 215, 218)");
    cy.url().should("include", "/register");
  });

  it("register with valid data", () => {
    registerPage.register(
      randomUser.randomFirstName,
      randomUser.randomLastName,
      randomUser.randomEmail,
      randomUser.randomPassword,
      randomUser.randomPassword
    );
    cy.url().should("not.include", "/register");
  });

  it.only ("register via backend", () => {
    cy.request(
        "POST",
        "https://gallery-api.vivifyideas.com/api/auth/register",
        {
            email: randomUser.randomEmail,
            first_name: randomUser.randomFirstName,
            last_name: randomUser.randomLastName,
            password: randomUser.randomPassword,
            password_confirmation: randomUser.randomPassword,
            terms_and_condititons: true
        }
    ).its('body').then( response => {
        //console.log("RESPONSE", response);
        window.localStorage.setItem("token", response.access_token);
    });
    cy.visit("/login");
    loginPage.login(randomUser.randomEmail, randomUser.randomPassword)
  })
});