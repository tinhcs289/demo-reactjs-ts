export const ACTION = {
  NONE: 'NONE',
  MORE_ACTION: 'MORE_ACTION',
  OPEN_DETAIL: 'OPEN_DETAIL',
  CREATE: 'CREATE',
  CLONE: 'CLONE',
  DELETE: 'DELETE',
  DELETE_MULTI: 'DELETE_MULTI',
};

export const DESC = 'DESC';
export const ASC = 'ASC';
export const PAGE_INDEX = 1;
export const PAGE_SIZE = 10;

export enum ERequestStatus {
  NONE = 1,
  REQUESTING = 2,
  REQUESTSUCCESS = 3,
  REQUESTFAIL = 4,
}
