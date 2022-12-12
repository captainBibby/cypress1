class CreateGalleryPage {

    get createGalleryHeading() {
        return cy.get("h1")
    }

    get tilteInput () {
        return cy.get("input").first()
    }

    get descriptionInput () {
        return cy.get("input").eq(1)
    }

    get imageUrlInput () {
        return cy.get("input").last()
    }

    get addNewImgButton () {
        return cy.get("button").eq(-3)
    }

    get submitButton () {
        return cy.get("button").eq(-2)
    }

    get alertMessage(){
        return cy.get(".alert");
    }

    createGallery (title, description, imageUrl) {
        this.tilteInput.type(title);
        this.descriptionInput.type(description);
        this.imageUrlInput.type(imageUrl);
        this.submitButton.click();
    }
}

export const createGalleryPage = new CreateGalleryPage();
