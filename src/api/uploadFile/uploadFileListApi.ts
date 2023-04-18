import uploadFileApi from '@/api/uploadFile/uploadFileApi';
import { EApiRequestStatus } from '@/constants/apiRequestStatus';
import type { ApiRequestStatus } from '@/types';

type TFileResponse = {
  bin?: File;
  source?: string;
  requestStatus?: ApiRequestStatus;
};

const uploadFileListApi = async (payload: {
  folder: string;
  files: FileList | File[];
}): Promise<TFileResponse[]> => {
  try {
    const results = await Promise.all(
      Array.from(payload.files).map((file) =>
        (async () => {
          const fileRes: TFileResponse = { bin: file, requestStatus: EApiRequestStatus.REQUESTING };
          try {
            let res = await uploadFileApi({ folder: payload.folder, file });
            if (!(res?.status === 200 && !!res?.data?.message)) throw res;
            fileRes.source = res.data.message;
            fileRes.requestStatus = EApiRequestStatus.REQUESTSUCCESS;
          } catch (error) {
            fileRes.requestStatus = EApiRequestStatus.REQUESTFAIL;
            fileRes.source = undefined;
          } finally {
            return fileRes;
          }
        })()
      )
    );
    return results.filter((rs) => rs?.requestStatus === EApiRequestStatus.REQUESTSUCCESS && !!rs?.source);
  } catch (error) {
    console.log(error);
    return [];
  }
};
export default uploadFileListApi;
