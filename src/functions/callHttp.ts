import type { AxiosResponse } from 'axios';
enum RES_ERROR {
  REQUEST_ERROR = 'REQUEST_ERROR',
  //TODO: add more key for specified case of error
}
type InvalidResponseError = `${RES_ERROR}`;
export type AsyncAxiosFuntion<ResponseDataType> = (
  ...args: any[]
) => Promise<AxiosResponse<ResponseDataType, any>>;
export type AxiosPromise<ResponseDataType> = Promise<AxiosResponse<ResponseDataType, any>>;
export type CallHttpReturnsSuccess<ResponseDataType> = [null, ResponseDataType];
export type CallHttpReturnsError<ResponseDataType> = [
  AxiosResponse<ResponseDataType, any> | InvalidResponseError,
  null,
];
export type CallHttpReturns<ResponseDataType> =
  | CallHttpReturnsSuccess<ResponseDataType>
  | CallHttpReturnsError<ResponseDataType>;
/**
 * An elegant way to do async/await api call
 * @example 
   // call api then take manual validate the response
   const [error, result] = await callHttp(getUsers(payload)).wait(r => r?.status === 200 && r?.data?.result?.lenght > 0);
   if (error) alert(errorResponse?.data?.error || 'something went wrong');
   handle(result)
 * @example 
   // call api then validate the response data (incase status ok)
   const [error, result] = await callHttp(getUsers(payload)).desireSuccessWith(r => r?.data?.result?.lenght > 0);
   if (errorResponse) alert(errorResponse?.data?.error || 'something went wrong');
   handle(result)
 * @example 
   // call api with no desire for response, 
   await callHttp(getUsers(payload)).withNoDesire();
   // do something next
 */
export default function callHttp<ResponseDataType>(
  requestCall: AsyncAxiosFuntion<ResponseDataType> | AxiosPromise<ResponseDataType>,
  ...args: any[]
) {
  return {
    wait: async function (
      isResponseOk: (response: AxiosResponse<ResponseDataType, any>) => boolean
    ): Promise<CallHttpReturns<ResponseDataType>> {
      try {
        const res = await (typeof requestCall === 'function' ? requestCall(...args) : requestCall);
        if (!res || !res?.status) throw res;
        if (!isResponseOk(res)) throw res;
        return [null, res.data];
      } catch (error) {
        console.log(error);
        if (!error || !(error as AxiosResponse<ResponseDataType, any>)?.status)
          return [RES_ERROR.REQUEST_ERROR, null];
        return [error as AxiosResponse<ResponseDataType, any>, null];
      }
    },
    waitForSuccess: async function (): Promise<CallHttpReturns<ResponseDataType>> {
      try {
        const res = await (typeof requestCall === 'function' ? requestCall(...args) : requestCall);
        if (!(Number.isInteger(res?.status) && 200 <= res.status && res.status <= 206)) throw res;
        return [null, res.data];
      } catch (error) {
        console.log(error);
        if (!error || !(error as AxiosResponse<ResponseDataType, any>)?.status)
          return [RES_ERROR.REQUEST_ERROR, null];
        return [error as AxiosResponse<ResponseDataType, any>, null];
      }
    },
    waitFor: async function (
      isResponseOk: (response: AxiosResponse<ResponseDataType, any>) => boolean
    ): Promise<CallHttpReturns<ResponseDataType>> {
      try {
        const res = await (typeof requestCall === 'function' ? requestCall(...args) : requestCall);
        if (!(Number.isInteger(res?.status) && 200 <= res.status && res.status <= 206)) throw res;
        if (!isResponseOk(res)) throw res;
        const returns = [null, res.data];
        return returns as any;
      } catch (error) {
        console.log(error);
        if (!error || !(error as AxiosResponse<ResponseDataType, any>)?.status)
          return [RES_ERROR.REQUEST_ERROR, null];
        return [error as AxiosResponse<ResponseDataType, any>, null];
      }
    },
    waitForNothing: async function (): Promise<void> {
      try {
        await (typeof requestCall === 'function' ? requestCall(...args) : requestCall);
        return;
      } catch (error) {
        console.log(error);
        return;
      }
    },
  };
}
