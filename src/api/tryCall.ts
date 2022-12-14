import type { AxiosResponse } from 'axios';

export type TryCallOptions<ResponseDataType> = {
  errorHandler?: (response: AxiosResponse<ResponseDataType, any>) => void;
};

const tryCall = async <ResponseDataType>(
  requestCall: Promise<AxiosResponse<ResponseDataType, any>>,
  isResponseOk: (response: AxiosResponse<ResponseDataType, any>) => boolean,
  options?: TryCallOptions<ResponseDataType>,
) => {
  try {
    const res = await requestCall;
    if (!isResponseOk(res)) throw res;
    return res.data;
  } catch (error) {
    console.log(error);
    options?.errorHandler?.(error as any);
    return null;
  }
};
export default tryCall;
