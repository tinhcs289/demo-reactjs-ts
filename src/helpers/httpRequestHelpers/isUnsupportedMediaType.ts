import type { AxiosResponse } from "axios";
import hasHttpStatus from "./hasHttpStatus";
export default function isUnsupportedMediaType(response?: AxiosResponse) {
  return hasHttpStatus(response, 415);
}
