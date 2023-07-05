import type { ApiPayload, ApiReturns } from './_types';
type OrginalResponseData = ApiReturns;
function migrateResponseData(orginal?: OrginalResponseData): ApiReturns | null {
  return orginal || null;
}
type OrginalPayload = ApiPayload;
function migratePayload(payload: ApiPayload): OrginalPayload {
  return payload;
}
const migrate = {
  migrateResponseData,
  migratePayload,
};
export default migrate;
