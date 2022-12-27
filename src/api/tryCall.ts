import type { AxiosResponse } from 'axios';

enum RES_ERROR {
  REQUEST_ERROR = 'REQUEST_ERROR',
  //TODO: add more key for specified case of error
}

type InvalidResponseError = `${RES_ERROR}`;

/**
 * An elegant way to do async/await api call
 * @example
   // call api then take manual validate the response
   const [result, errorResponse] = await tryCall(getUsers, payload).desire(r => r?.status === 200 && r?.data?.result?.lenght > 0);
   if (errorResponse) alert(errorResponse?.data?.error || 'something went wrong');
   handle(result)
 * @example
   // call api then validate the response data (incase status ok)
   const [result, errorResponse] = await tryCall(getUsers, payload).desireSuccessWith(r => r?.data?.result?.lenght > 0);
   if (errorResponse) alert(errorResponse?.data?.error || 'something went wrong');
   handle(result)
 * @example
   // call api with no desire for response, 
   await tryCall(getUsers, payload).withNoDesire();
   // do something next
 */
function tryCall<ResponseDataType>(
  requestCall: (...args: any[]) => Promise<AxiosResponse<ResponseDataType, any>>,
  ...args: any[]
) {
  return {
    desire: async (
      isResponseOk: (response: AxiosResponse<ResponseDataType, any>) => boolean,
    ): Promise<[ResponseDataType, null] | [null, AxiosResponse<ResponseDataType, any> | InvalidResponseError]> => {
      try {
        const res = await requestCall(...args);
        if (!res || !res?.status) throw res;
        if (!isResponseOk(res)) throw res;
        return [res.data, null];
      } catch (error) {
        if (!error || !(error as AxiosResponse<ResponseDataType, any>)?.status) return [null, RES_ERROR.REQUEST_ERROR];
        return [null, error as AxiosResponse<ResponseDataType, any>];
      }
    },
    desireSuccess: async (): Promise<
      [ResponseDataType, null] | [null, AxiosResponse<ResponseDataType, any> | InvalidResponseError]
    > => {
      try {
        const res = await requestCall(...args);
        if (!(Number.isInteger(res?.status) && 200 <= res.status && res.status <= 206)) throw res;
        return [res.data, null];
      } catch (error) {
        if (!error || !(error as AxiosResponse<ResponseDataType, any>)?.status) return [null, RES_ERROR.REQUEST_ERROR];
        return [null, error as AxiosResponse<ResponseDataType, any>];
      }
    },
    desireSuccessWith: async (
      isResponseOk: (response: AxiosResponse<ResponseDataType, any>) => boolean,
    ): Promise<[ResponseDataType, null] | [null, AxiosResponse<ResponseDataType, any> | InvalidResponseError]> => {
      try {
        const res = await requestCall(...args);
        if (!(Number.isInteger(res?.status) && 200 <= res.status && res.status <= 206)) throw res;
        if (!isResponseOk(res)) throw res;
        return [res.data, null];
      } catch (error) {
        if (!error || !(error as AxiosResponse<ResponseDataType, any>)?.status) return [null, RES_ERROR.REQUEST_ERROR];
        return [null, error as AxiosResponse<ResponseDataType, any>];
      }
    },
    withNoDesire: async (): Promise<void> => {
      try {
        await requestCall(...args);
        return;
      } catch (error) {
        return;
      }
    },
  };
}
export default tryCall;
