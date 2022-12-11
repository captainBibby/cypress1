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
        invalidGalleryImage: "test image"
    }

    before ("create new gallery", () => {
        cy.loginViaBackend();
        cy.visit('/create')
    });

    // it ("visit default URL", () => {
    //     cy.visit("/");
    //     navigation.loginButton.should("not.exist");
    // });

    it ("create new gallery with valid data", () => {
        createGalleryPage.createGallery(
            gallery.galeryTiltle,
            gallery.galleryDescription,
            gallery.galleryImage
        );
    })
})