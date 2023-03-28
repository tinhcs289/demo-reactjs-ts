import tryCall from '@/functions/tryCall';
import tryDo from '@/functions/tryDo';
import wait from '@/functions/wait';
import api from './api';

const deleteItem = async (args: { id: string }) => {
  const result = await tryCall(api, args).desireSuccess();
  await tryDo(wait, 1000);
  return result;
};
export default deleteItem;
