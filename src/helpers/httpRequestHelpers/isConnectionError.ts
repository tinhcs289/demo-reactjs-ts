import type { AxiosResponse } from 'axios';
export default function isConnectionError(response?: AxiosResponse) {
  return !response;
}
