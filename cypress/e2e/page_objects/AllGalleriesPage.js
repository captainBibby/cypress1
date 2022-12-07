class AllGalleriesPage {

    get allGalleriesHeading() {
        return cy.get("h1")
    }

    get searchInput() {
        return cy.get("input");
    }

    get fillterButton() {
        return cy.get("button").first();
    }

    get loadMoreButton() {
        return cy.get("button").last();
    }

    get singleGallery() {
        return cy.get(".cell");
    }

    get galleryHeading() {
        return this.singleGallerie.find("h2")
    }

    get galleryAuthor() {
        return this.singleGallerie.find("p")
    }

    get galleryCreationDate() {
        return this.singleGallerie.find("small")
    }

    get galleriesGrid() {
        return cy.get(".grid");
    }
    
    get galleryImage() {
        return cy.get("img");
    }

    searchAllGalleriesPage(searchText) {
        this.searchInput.type(searchText);
        this.fillterButton.click();
    }
}

export const allGalleriesPage = new AllGalleriesPage();