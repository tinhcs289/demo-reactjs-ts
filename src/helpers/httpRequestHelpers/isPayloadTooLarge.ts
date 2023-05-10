import type { AxiosResponse } from "axios";
import hasHttpStatus from "./hasHttpStatus";
export default function isPayloadTooLarge(response?: AxiosResponse) {
  return hasHttpStatus(response, 413);
}
