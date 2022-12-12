/// <reference types="Cypress"/>

import { faker } from "@faker-js/faker";
import { loginPage  } from "./page_objects/loginPage";
import { createGalleryPage } from "./page_objects/createGalleryPage";
import { navigation } from "./page_objects/navigation";

describe("crete gallery page test", function () {
    let galleryId = "";

    let gallery = {
        galeryTiltle: faker.animal.cat(),
        galleryDescription: faker.lorem.words(5),
        galleryImage: "https://upload.wikimedia.org/wikipedia/commons/a/a3/June_odd-eyed-cat.jpg",
        invalidGalleryImage: "https://media.tenor.com/7r-BGEoIohkAAAAM/meme-cat.gif"
    }

    let date = new Date();
    date.toString();

    before ("create new gallery", () => {
        cy.loginViaBackend();
        cy.visit('/create')
    });

    it ("visit default URL", () => {
        navigation.loginButton.should("not.exist");
    });

    it.only ("create new gallery with valid data", () => {

        cy.intercept(
            "POST",
            " https://gallery-api.vivifyideas.com/api/galleries"
        ).as("successfullyCreatedGallery");

        createGalleryPage.createGallery(
            gallery.galeryTiltle,
            gallery.galleryDescription,
            gallery.galleryImage
        );

        cy.wait("@successfullyCreatedGallery").then ((interception) => {
            cy.log(JSON.stringify(interception.response));
            expect(interception.response.statusCode).eq(201);
            expect(interception.response.body).to.exist;
            expect(interception.response.body.created_at.toString()).eq(date);
        })
    })

    it ("create new gallery with two images", () => {
        createGalleryPage.createGallery(
            gallery.galeryTiltle,
            gallery.galleryDescription,
            gallery.galleryImage
        );
    })

    it ("create new gallery with invalid img format", () => {
        
        createGalleryPage.createGallery(
            gallery.galeryTiltle,
            gallery.galleryDescription,
            gallery.invalidGalleryImage
        );
        
        createGalleryPage.alertMessage.should("be.visible")
        .and ("have.text", "Wrong format of image")
        .and ("have.css",
        "background-color",
        "rgb(248, 215, 218)");
    })

})