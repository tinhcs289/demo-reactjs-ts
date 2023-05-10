import hasHttpStatus from "./hasHttpStatus";
import type { AxiosResponse } from "axios";
export default function isBadRequest(response?: AxiosResponse) {
  return hasHttpStatus(response, 400);
}
