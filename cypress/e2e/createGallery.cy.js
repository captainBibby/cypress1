/// <reference types="Cypress"/>

import { faker } from "@faker-js/faker";
import { loginPage  } from "./page_objects/loginPage";
import {createGalleryObject} from "./page_objects/createGalleryObject";

describe("crete gallery page test", function () {
    let galleryId = "";

    let gallery = {
        galeryTiltle: faker.animal.cat(),
        galleryDescription: faker.lorem.paragraph(),
        galleryImage: "test image",
        invalidGalleryImage: "test image"
    }
})