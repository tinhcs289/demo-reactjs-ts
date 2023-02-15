//#region import cases
import pushMessage from './cases/pushMessage';
import pushMessageError from './cases/pushMessageError';
import pushMessageInfo from './cases/pushMessageInfo';
//#endregion
const actions = {
  pushMessage: pushMessage.action,
  pushMessageInfo: pushMessageInfo.action,
  pushMessageError: pushMessageError.action,
};
export default actions;