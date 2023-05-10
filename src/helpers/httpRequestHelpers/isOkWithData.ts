import type { AxiosResponse } from 'axios';
import isOk from './isOk'
import hasResponseData from './hasResponseData';
export default function isOkWithData(response?: AxiosResponse) {
  return isOk(response) && hasResponseData(response);
}
