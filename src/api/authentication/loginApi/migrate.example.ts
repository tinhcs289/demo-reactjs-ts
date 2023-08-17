import type { ApiPayload, ApiReturns } from './_types';
type OrginalResponseData = {
  // define the type of the api response of the backend service
  [x: string]: any;
};
function migrateResponseData(orginal?: OrginalResponseData): ApiReturns | null {
  // some logic to convert response data to the type of `ApiReturns`
  return orginal as ApiReturns;
}
type OrginalPayload = {
  // define the type of the api payload of the backend service
  [x: string]: any;
};
function migratePayload(payload: ApiPayload): OrginalPayload {
  // some logic to convert response payload to the type of `ApiPayload`
  return payload as OrginalPayload;
}
const migrate = {
  migrateResponseData,
  migratePayload,
};
export default migrate;
