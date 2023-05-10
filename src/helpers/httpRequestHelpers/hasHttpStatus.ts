import type { AxiosResponse } from 'axios';
export default function hasHttpStatus(response?: AxiosResponse<any>, status?: number) {
  if (!status || !Number.isInteger(status)) return false;
  if (!response?.status || !Number.isInteger(response?.status)) return false;
  return status === response.status;
}
