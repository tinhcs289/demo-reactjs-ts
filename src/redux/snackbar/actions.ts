//#region import cases
import pushMessage from './cases/pushMessage';
import pushMessageError from './cases/pushMessageError';
import pushMessageInfo from './cases/pushMessageInfo';
import clearMessageState from './cases/clearMessageState';
//#endregion
const actions = {
  pushMessage: pushMessage.action,
  pushMessageInfo: pushMessageInfo.action,
  pushMessageError: pushMessageError.action,
  clearMessageState: clearMessageState.action,
};
export default actions;