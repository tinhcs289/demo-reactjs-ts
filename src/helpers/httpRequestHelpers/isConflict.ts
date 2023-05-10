import hasHttpStatus from './hasHttpStatus';
import type { AxiosResponse } from 'axios';
export default function isConflict(response?: AxiosResponse) {
  return hasHttpStatus(response, 409);
}
