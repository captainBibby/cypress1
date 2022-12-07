/// <reference types="Cypress" />

import { faker } from "@faker-js/faker";
import { registerPage } from "./page_objects/registerPage";

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

  it.only("register with existing email", () => {
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

  it.only("register with wrong password confirmation", () => {
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

});