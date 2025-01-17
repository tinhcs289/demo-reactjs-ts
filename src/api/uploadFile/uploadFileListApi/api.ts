import uploadFileApi from '@/api/uploadFile/uploadFileApi';
import { HttpRequestStatus } from '@/constants/apiRequestStatus';
import callHttp from '@/helpers/asyncHelpers/callHttp';
import tryDo from '@/helpers/asyncHelpers/tryDo';
import isOkWithData from '@/helpers/httpRequestHelpers/isOkWithData';
import type { ApiPayload, ApiReturns, UploadFileResponse } from './_types';
export default async function api(payload: ApiPayload): Promise<ApiReturns> {
  const [errors, filesData] = await tryDo(async () => {
    const results = await Promise.all(
      Array.from(payload.files).map((file) =>
        (async () => {
          const fileRes: UploadFileResponse = {
            bin: file,
            requestStatus: HttpRequestStatus.REQUESTING,
          };
          const [err, res] = await callHttp(uploadFileApi({ folder: payload.folder, file })).waitFor(
            isOkWithData
          );
          if (!!err || !res?.message) {
            fileRes.requestStatus = HttpRequestStatus.REQUESTFAIL;
            fileRes.source = undefined;
            return fileRes;
          }
          fileRes.source = res.message;
          fileRes.requestStatus = HttpRequestStatus.REQUESTSUCCESS;
          return fileRes;
        })()
      )
    );
    return results.filter((rs) => rs?.requestStatus === HttpRequestStatus.REQUESTSUCCESS && !!rs?.source);
  });
  if (!!errors || !filesData) return [];
  return filesData;
}
