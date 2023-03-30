export class PageObject {
    url = '/';

    visit(url?: string): void {
        cy.visit(url || this.url);
    }

    getCallFormButton(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('#call-form-button');
    }

    assertCallFormButtonIsVisible(): void {
        this.getCallFormButton().should('be.visible');
    }

    clickCallFormButton(): void {
        this.getCallFormButton().click();
    }

    getCallForm(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('#call-form');
    }

    assertCallFormIsVisible(): void {
        this.getCallForm().should('be.visible');
    }

    assertFormIsNotExist(): void {
        this.getCallForm().should('not.exist');
    }

    assertSuccessMessage():void {
        cy.get('.MuiAlert-message')
            .should('be.visible')
            .and('contain.text', 'Successfully saved!');
    }
}