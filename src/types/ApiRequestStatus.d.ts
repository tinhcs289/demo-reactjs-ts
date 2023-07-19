import type { AxiosResponse } from 'axios';
export type ApiRequestStatus = 1 | 2 | 3 | 4;
export type ApiResponseWithMessageOnly = { message: string };
export type AsyncApi<T> = Promise<AxiosResponse<T, any>>;
export type HttpApiEndpoint = { url: string; isMock?: boolean };
