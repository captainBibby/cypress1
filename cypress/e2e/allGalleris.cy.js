/// <reference types="Cypress"/>

import { allGalleriesPage } from "./page_objects/AllGalleriesPage";
import { loginPage } from "./page_objects/LoginPage";

describe("all galleries test", () => {
    
    let existingUser = {
        validEmail : "bibi@gmail.com",
        validPassword : "1111111a",
    };

    let searchText = "novi sad 3 slike"

    before("log into the application", () => {
        cy.visit("/login");

        cy.url().should("include", "/login");
        loginPage.loginHeading
        .should("be.visible")
        .and ("have.text", "Please login");

        loginPage.login(existingUser.validEmail, existingUser.validPassword);

        cy.url().should("include", "/login");
        allGalleriesPage.allGalleriesHeading
        .should("be.visible")
        .and("have.text", "All Galleries");
    });

    it ("all galleries loaded", () => {
        allGalleriesPage.singleGallery.should("have.length", 10);
        allGalleriesPage.galleryImage.should("have.length", 10);
    })

    it ("test pagination", () => {
        allGalleriesPage.singleGallery.should("have.length", 10);
        allGalleriesPage.loadMoreButton.click();
        allGalleriesPage.singleGallery.should("have.length", 20);
    })

    it ("redirect to single gallery", () => {
        allGalleriesPage.singleGallery.first().find("a").first().click();
        allGalleriesPage.allGalleriesHeading.should("not.have.text", "All Galleries");
        cy.url().should("include", "/galleries");
    })

    it.skip ("search for existing galleries", () => {
        allGalleriesPage.searchAllGalleriesPage(searchText);
        allGalleriesPage.singleGallerie.should("have.length", 1);
        cy.contains(searchText);
    });
});
