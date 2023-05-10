import type { AxiosResponse } from "axios";
import hasHttpStatus from "./hasHttpStatus";
export default function isCreated(response?: AxiosResponse) {
  return hasHttpStatus(response, 201);
}
