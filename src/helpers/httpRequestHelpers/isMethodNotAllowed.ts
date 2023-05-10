import type { AxiosResponse } from "axios";
import hasHttpStatus from "./hasHttpStatus";
export default function isMethodNotAllowed(response?: AxiosResponse) {
  return hasHttpStatus(response, 405);
}
