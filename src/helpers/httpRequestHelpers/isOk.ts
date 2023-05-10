import type { AxiosResponse } from 'axios';
export default function isOk(response?: AxiosResponse) {
  if (!response?.status || !Number.isInteger(response?.status)) return false;
  return response.status >= 200 && response.status <= 206;
}
