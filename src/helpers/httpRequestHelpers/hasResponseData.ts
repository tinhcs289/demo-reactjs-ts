import type { AxiosResponse } from "axios";
export default function hasResponseData(response?: AxiosResponse) {
  return !!response?.data;
}
