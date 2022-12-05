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

    clickLoginButton () {
        this.loginButton.click()
    }

    clickLogoutButton () {
        this.logoutButton.click()
    }

    clickRegisterButton () {
        this.registerButton.click()
    }
}

export const navigation = new Navigation();