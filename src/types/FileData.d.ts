import type { ApiRequestStatus } from '@/types/ApiRequestStatus';
export type FileData = {
  id: string | number;
  source?: string;
  file?: File;
  uploadStatus?: ApiRequestStatus;
};
