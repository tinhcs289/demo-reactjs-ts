import type { AnyObject } from '@/types/AnyObject';
import type { ApiRequestStatus } from '@/types/ApiRequestStatus';
export type FileData<FileInfo extends AnyObject = AnyObject> = FileInfo & {
  id: string | number;
  source?: string;
  file?: File;
  base64?: string;
  uploadStatus?: ApiRequestStatus;
};
