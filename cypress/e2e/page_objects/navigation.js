class Navigation {
    get loginButton() {
        return cy.get("a[href='/login']")
    }

    get logoutButton() {
        return cy.get(".ml-auto > :nth-child(3) > .nav-link")
    }

    get registerButton() {
        return cy.get("a[href='/register']")
    }

    get createGalleryButton() {
        return cy.get(".ml-auto > :nth-child(2) > .nav-link")
    }

    clickLoginButton () {
        this.loginButton.click()
    }

    clickLogoutButton () {
        this.logoutButton.click()
    }

    clickRegisterButton () {
        this.registerButton.click()
    }

    clickCreateGalleryButton () {
        this.createGalleryButton.click()
    }

}

export const navigation = new Navigation();