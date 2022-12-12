/// <reference types="Cypress"/>

import {navigation} from './page_objects/navigation'
import {loginPage} from './page_objects/loginPage'

describe ("login test", () => {

    beforeEach ("login test", () => {
        cy.visit("/");
        cy.url().should('include', 'gallery-app');
        navigation.clickLoginButton();
        cy.url().should('include', '/login');
        
        loginPage.loginHeading.should("be.visible")
        .and("have.text", "Please login");
    })

    it.only ("login with invalid email", () => {
        loginPage.login("error@gmail.com", "1111111a");
        loginPage.alertMessage.should("be.visible");
        loginPage.alertMessage.should("have.text", "Bad Credentials");
        loginPage.alertMessage.should(
        "have.css",
        "background-color", 
        "rgb(248, 215, 218)"
        );
        cy.url().should("include", "login");
    })

    it ("login with invalid password", () => {
        loginPage.login("bibi@gmail.com", "1234te")
    })

    it ("login with invalid credentials", () => {
        loginPage.login("unknown@gmail.com", "1234test")
    })

    it.only("login with valid credentials", () => {
        cy.intercept(
          "POST",
          "https://gallery-api.vivifyideas.com/api/auth/login"
        ).as("successfullLogin");
        loginPage.login(Cypress.env("userEmail"), Cypress.env("userPassword"));
        cy.wait("@successfullLogin").then((interception) => {
          expect(interception.response.statusCode).eq(200);
          expect(interception.response.body.access_token).to.exist;
        });
        cy.url().should("not.include", "/login");
        navigation.logoutButton.should('be.visible');
        //navigation.clickLogoutButton();
        //navigation.logoutButton.should('not.exist');
      });
});
