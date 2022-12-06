class SearchAllGalleriesPage {

    get searchInput() {
        return cy.get("input");
    }

    get fillterButton() {
        return cy.get("button");
    }

    searchAllGalleriesPage(searchText) {
        this.searchInput.type(searchText);
        this.fillterButton.click();
    }
}

export const searchAllGalleriesPage = new SearchAllGalleriesPage();