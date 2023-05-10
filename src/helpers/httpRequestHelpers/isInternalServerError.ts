import type { AxiosResponse } from "axios";
import hasHttpStatus from "./hasHttpStatus";
export default function isInternalServerError(response?: AxiosResponse) {
  return hasHttpStatus(response, 500);
}
