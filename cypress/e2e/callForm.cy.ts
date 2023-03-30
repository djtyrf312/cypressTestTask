import { PageObject } from '../support/pageObject';
import { CallForm } from '../support/testData/callForm';
import {
  CallReasonOptions,
  CallTypeOptions,
  PhoneNumberOptions,
  ResultTypeOptions
} from '../support/testData/callForm.typedefs';
import { callFormFieldIds, generateRandomString } from '../support/testData/constants';

const mainPage = new PageObject();
const callForm = new CallForm();

describe('Call form', () => {
  beforeEach(() => {
    mainPage.visit();
  });

  it('should be opened', () => {
    mainPage.assertCallFormButtonIsVisible();
    mainPage.clickCallFormButton();
    mainPage.assertCallFormIsVisible();
  });

  it('should contain all fields and options', () => {
    mainPage.clickCallFormButton();
    // NOTE : check default fields and button in form
    callForm.assertCallTypeFieldIsExist();
    callForm.assertPhoneNumberFieldIsExist();
    callForm.assertCallResultFieldIsExist();
    callForm.assertFormSaveButtonIsExist();

    // NOTE: Check Phone number field options
    callForm.clickTheField(callFormFieldIds.phoneNumber);
    callForm.assertPhoneNumberOption(PhoneNumberOptions.OPTION_0);
    callForm.assertPhoneNumberOption(PhoneNumberOptions.OPTION_1);
    callForm.assertPhoneNumberOption(PhoneNumberOptions.OPTION_2);

    // NOTE: check the call reason field options
    callForm.clickTheField(callFormFieldIds.callType);
    callForm.assertCallTypeOption(CallTypeOptions.INCOMING_CALL);
    callForm.selectCallTypeOption(CallTypeOptions.INCOMING_CALL);
    callForm.assertCallReasonFieldIsExist();
    callForm.clickTheField(callFormFieldIds.callReason);
    callForm.assertCallReasonOption(CallReasonOptions.SMS);
    callForm.assertCallReasonOption(CallReasonOptions.EMAIL);
    callForm.assertCallReasonOption(CallReasonOptions.MISSED_CALL);
    callForm.hideDropdown();

    // NOTE: check the result type field options
    callForm.clickTheField(callFormFieldIds.callType);
    callForm.assertCallTypeOption(CallTypeOptions.OUTGOING_CALL);
    callForm.selectCallTypeOption(CallTypeOptions.OUTGOING_CALL);
    callForm.assertResultTypeFieldIsExist();
    callForm.clickTheField(callFormFieldIds.resultType);
    callForm.assertResultTypeOption(ResultTypeOptions.NOT_AVAILABLE);
    callForm.assertResultTypeOption(ResultTypeOptions.WRONG_PERSON);
    callForm.assertResultTypeOption(ResultTypeOptions.BUSY);
    callForm.assertResultTypeOption(ResultTypeOptions.SUCCESSFUL);
    callForm.hideDropdown();
  });

  it('should show validation messages for all fields', () => {
    mainPage.clickCallFormButton();
    callForm.clickTheField(callFormFieldIds.phoneNumber);
    callForm.selectPhoneNumberOption(PhoneNumberOptions.OPTION_0);
    callForm.clickTheField(callFormFieldIds.callResult);
    callForm.fillTheField(callFormFieldIds.callResult, "test result message");
    callForm.clickSaveFormButton();
    callForm.assertValidationErrorIsExist();
    callForm.clickTheField(callFormFieldIds.callType);
    callForm.selectCallTypeOption(CallTypeOptions.INCOMING_CALL);
    callForm.clickSaveFormButton();
    callForm.assertValidationErrorIsExist();
    callForm.clickTheField(callFormFieldIds.callType);
    callForm.selectCallTypeOption(CallTypeOptions.OUTGOING_CALL);
    callForm.clickSaveFormButton();
    callForm.assertValidationErrorIsExist();
    callForm.clickTheField(callFormFieldIds.resultType);
    callForm.clickTheResultTypeOption(ResultTypeOptions.SUCCESSFUL);
    callForm.clearTheField(callFormFieldIds.phoneNumber);
    callForm.getPhoneNumber().clear();
    callForm.clickSaveFormButton();
    callForm.assertValidationErrorIsExist();
    callForm.clickTheField(callFormFieldIds.phoneNumber);
    callForm.selectPhoneNumberOption(PhoneNumberOptions.OPTION_0);
    callForm.clickTheField(callFormFieldIds.callResult);
    callForm.clearTheField(callFormFieldIds.callResult);
    callForm.clickSaveFormButton();
    callForm.assertValidationErrorIsExist();
  });

  it('should hide the form and show success message, when user fill out the form and click save ', () => {
    mainPage.clickCallFormButton();
    callForm.fillTheForm("message");
    callForm.clickSaveFormButton();
    mainPage.assertFormIsNotExist();
    mainPage.assertSuccessMessage();
  });

  it('should sent form with numbers in call result field', () => {
    mainPage.clickCallFormButton();
    callForm.fillTheForm(1234567890);
    callForm.clickSaveFormButton();
    mainPage.assertFormIsNotExist();
    mainPage.assertSuccessMessage();
  });

  it('should sent form with spaces in call result field', () => {
    mainPage.clickCallFormButton();
    callForm.fillTheForm('   test     message    ');
    callForm.clickSaveFormButton();
    mainPage.assertFormIsNotExist();
    mainPage.assertSuccessMessage();
  });

  it('should sent form with at least 1 symbol in call result field', () => {
    mainPage.clickCallFormButton();
    callForm.fillTheForm('a');
    callForm.clickSaveFormButton();
    mainPage.assertFormIsNotExist();
    mainPage.assertSuccessMessage();
  });

  it('should sent form with 256 symbols in call result field', () => {
    const string = generateRandomString(256);

    mainPage.clickCallFormButton();
    callForm.fillTheForm(string);
    callForm.clickSaveFormButton();
    mainPage.assertFormIsNotExist();
    mainPage.assertSuccessMessage();
  });
})