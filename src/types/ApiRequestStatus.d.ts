import type { AxiosResponse } from 'axios';
import { HttpRequestStatus } from '@/constants/apiRequestStatus';
export type ApiRequestStatus = HttpRequestStatus;
export type ApiResponseWithMessageOnly = { message: string };
export type AsyncApi<T> = Promise<AxiosResponse<T, any>>;
export type HttpApiEndpoint = { url: string; isMock?: boolean };
