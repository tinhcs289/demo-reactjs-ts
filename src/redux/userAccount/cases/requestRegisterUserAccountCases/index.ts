import clearStatusOfRequestRegisterUserAccount from './clearStatusOfRequestRegisterUserAccount';
import requestRegisterUserAccount from './requestRegisterUserAccount';
import requestRegisterUserAccountFail from './requestRegisterUserAccountFail';
import requestRegisterUserAccountSuccess from './requestRegisterUserAccountSuccess';
export const cases = [
  clearStatusOfRequestRegisterUserAccount,
  requestRegisterUserAccount,
  requestRegisterUserAccountFail,
  requestRegisterUserAccountSuccess,
];
export const actions = {
  requestRegisterUserAccount: requestRegisterUserAccount.action,
  requestRegisterUserAccountSuccess: requestRegisterUserAccountSuccess.action,
  requestRegisterUserAccountFail: requestRegisterUserAccountFail.action,
  clearStatusOfRequestRegisterUserAccount: clearStatusOfRequestRegisterUserAccount.action,
};
