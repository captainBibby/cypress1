class CreateGalleryPage {

get createGalleryHeading() {

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

get adImgButton () {
    return cy.get("button").first(-3)
}

get submitButton () {
    return cy.get("button").eq(-2)
}
}