import type { AxiosResponse } from "axios";
import hasHttpStatus from "./hasHttpStatus";
export default function isNotFound(response?: AxiosResponse) {
  return hasHttpStatus(response, 404);
}
