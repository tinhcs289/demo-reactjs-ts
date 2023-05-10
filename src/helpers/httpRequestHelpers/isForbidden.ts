import type { AxiosResponse } from "axios";
import hasHttpStatus from "./hasHttpStatus";
export default function isForbidden(response?: AxiosResponse) {
  return hasHttpStatus(response, 403);
}
