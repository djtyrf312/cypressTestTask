import {
    CallReasonOptions,
    CallTypeOptions,
    PhoneNumberOptions,
    ResultTypeOptions
} from './callForm.typedefs';
import {callFormFieldIds} from './constants';

export class CallForm {
    getCallType(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('#call-type');
    }

    assertCallTypeFieldIsExist(): void {
        this.getCallType().should('exist');
    }

    getPhoneNumber(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('#phone-number');
    }

    assertPhoneNumberFieldIsExist(): void {
        this.getPhoneNumber().should('exist');
    }

    getCallResultField(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('#call-result');
    }

    assertCallResultFieldIsExist(): void {
        this.getCallResultField().should('exist');
    }

    getFormSaveButton(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('#form-save');
    }

    assertFormSaveButtonIsExist(): void {
        this.getFormSaveButton().should('exist');
    }

    clickTheField(selector: string): void {
        cy.get(selector).click();
    }

    getPhoneNumberOption(index: PhoneNumberOptions): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(`#phone-number-option-${index}`);
    }

    assertPhoneNumberOption(index: PhoneNumberOptions): void {
        if (index === PhoneNumberOptions.OPTION_0) {
            this.getPhoneNumberOption(index)
                .should('contain.text', "+1 123 456 7890");
        }

        if (index === PhoneNumberOptions.OPTION_1) {
            this.getPhoneNumberOption(index)
                .should('contain.text', "+1 987 654 3210");
        }

        if (index === PhoneNumberOptions.OPTION_2) {
            this.getPhoneNumberOption(index)
                .should('contain.text', "+1 555 444 3333");
        }
    }

    getCallTypeOption(option: CallTypeOptions): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(`[data-value="${option}"]`);
    }

    assertCallTypeOption(option: CallTypeOptions): void {
        if (option === CallTypeOptions.INCOMING_CALL) {
            this.getCallTypeOption(option)
                .should('contain.text', 'Incoming Call');
        }

        if (option === CallTypeOptions.OUTGOING_CALL) {
            this.getCallTypeOption(option)
                .should('contain.text', 'Outgoing Call');
        }
    }

    selectCallTypeOption(option: CallTypeOptions): void {
        this.getCallTypeOption(option).click();
    }

    getCallReasonField(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('#call-reason');
    }

    assertCallReasonFieldIsExist(): void {
        this.getCallReasonField().should('exist');
    }

    getCallReasonOption(option: CallReasonOptions): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(`[data-value="${option}"]`);
    }

    assertCallReasonOption(option: CallReasonOptions): void {
        if (option === CallReasonOptions.SMS) {
            this.getCallReasonOption(option)
                .should('contain.text', 'SMS');
        }

        if (option === CallReasonOptions.EMAIL) {
            this.getCallReasonOption(option)
                .should('contain.text', 'Email');
        }

        if (option === CallReasonOptions.MISSED_CALL) {
            this.getCallReasonOption(option)
                .should('contain.text', 'Missed Call');
        }
    }

    hideDropdown(): void {
        cy.get('body').click('topRight');
    }

    getResultTypeField(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('#result-type');
    }

    assertResultTypeFieldIsExist(): void {
        this.getResultTypeField().should('exist');
    }

    getResultTypeOption(option: ResultTypeOptions): Cypress.Chainable<JQuery<HTMLElement>> {
        if (option === ResultTypeOptions.NOT_AVAILABLE) {
            return cy.get(`[data-value="${option}"]`);
        }

        if (option === ResultTypeOptions.WRONG_PERSON) {
            return cy.get(`[data-value="${option}"]`);
        }

        if (option === ResultTypeOptions.BUSY) {
            return cy.get(`[data-value="${option}"]`);
        }

        if (option === ResultTypeOptions.SUCCESSFUL) {
            return cy.get(`[data-value="${option}"]`);
        }
    }

    assertResultTypeOption(option: ResultTypeOptions): void {
        if (option === ResultTypeOptions.NOT_AVAILABLE) {
            this.getResultTypeOption(option)
                .should('contain.text', 'Not available');
        }

        if (option === ResultTypeOptions.WRONG_PERSON) {
            this.getResultTypeOption(option)
                .should('contain.text', 'Wrong Person');
        }

        if (option === ResultTypeOptions.BUSY) {
            this.getResultTypeOption(option)
                .should('contain.text', 'Busy');
        }

        if (option === ResultTypeOptions.SUCCESSFUL) {
            this.getResultTypeOption(option)
                .should('contain.text', 'Successful');
        }
    }

    getSaveFormButton(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('#form-save');
    }

    clickSaveFormButton(): void {
        this.getSaveFormButton().click();
    }

    selectPhoneNumberOption(index: PhoneNumberOptions): void {
        this.getPhoneNumberOption(index).click();
    }

    fillTheField(selector: string, value: string): void {
        cy.get(selector).type(value);
    }

    assertValidationErrorIsExist(): void {
        cy.contains('Required').should('exist');
    }

    clickTheResultTypeOption(option: ResultTypeOptions): void {
        this.getResultTypeOption(option).click();
    }

    clearTheField(selector: string): void {
        cy.get(selector).clear();
    }

    selectResultTypeOption(option: ResultTypeOptions) {
        if (option === ResultTypeOptions.NOT_AVAILABLE) {
            this.clickTheResultTypeOption(option);
        }

        if (option === ResultTypeOptions.WRONG_PERSON) {
            this.clickTheResultTypeOption(option);
        }

        if (option === ResultTypeOptions.BUSY) {
            this.clickTheResultTypeOption(option);
        }

        if (option === ResultTypeOptions.SUCCESSFUL) {
            this.clickTheResultTypeOption(option);
        }
    }

    fillTheForm(text: string | number): void {
        this.clickTheField(callFormFieldIds.phoneNumber);
        this.selectPhoneNumberOption(PhoneNumberOptions.OPTION_0);
        this.clickTheField(callFormFieldIds.callType);
        this.selectCallTypeOption(CallTypeOptions.OUTGOING_CALL);
        this.clickTheField(callFormFieldIds.resultType);
        this.selectResultTypeOption(ResultTypeOptions.SUCCESSFUL);
        this.fillTheField(callFormFieldIds.callResult, `${text}`);
    }
}
