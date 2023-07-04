import type { ApiRequestStatus } from '@/types';
export type ApiPayload = {
  folder: string;
  files: FileList | File[];
};
export type UploadFileResponse = {
  bin?: File;
  source?: string;
  requestStatus?: ApiRequestStatus;
};
export type ApiReturns = UploadFileResponse[];
