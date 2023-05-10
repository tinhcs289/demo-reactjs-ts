import uploadFileApi from '@/api/uploadFile/uploadFileApi';
import { EApiRequestStatus } from '@/constants/apiRequestStatus';
import callHttp from '@/functions/callHttp';
import tryDo from '@/functions/tryDo';
import isOkWithData from '@/helpers/httpRequestHelpers/isOkWithData';
import type { ApiRequestStatus } from '@/types';
type TFileResponse = {
  bin?: File;
  source?: string;
  requestStatus?: ApiRequestStatus;
};
export type UploadFileListApiParams = {
  folder: string;
  files: FileList | File[];
}
export default async function uploadFileListApi(payload: UploadFileListApiParams): Promise<TFileResponse[]> {
  const [errors, filesData] = await tryDo(async () => {
    const results = await Promise.all(
      Array.from(payload.files).map((file) =>
        (async () => {
          const fileRes: TFileResponse = { bin: file, requestStatus: EApiRequestStatus.REQUESTING };
          const [err, res] = await callHttp(uploadFileApi({ folder: payload.folder, file })).waitFor(isOkWithData);
          if (!!err || !res?.message) {
            fileRes.requestStatus = EApiRequestStatus.REQUESTFAIL;
            fileRes.source = undefined;
            return fileRes;
          }
          fileRes.source = res.message;
          fileRes.requestStatus = EApiRequestStatus.REQUESTSUCCESS;
          return fileRes;
        })()
      )
    );
    return results.filter((rs) => rs?.requestStatus === EApiRequestStatus.REQUESTSUCCESS && !!rs?.source);
  });
  if (!!errors || !filesData) return [];
  return filesData;
};
