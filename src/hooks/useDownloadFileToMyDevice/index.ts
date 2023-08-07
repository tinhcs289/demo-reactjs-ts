import downloadFileToMyDevice from '@/helpers/fileHelpers/downloadFileToMyDevice';
import tryDo from '@/helpers/asyncHelpers/tryDo';
import { useCallback, useState } from 'react';
export type DownloadFileToMyDeviceParams = {
  fileId?: string | null;
  from?: string | null;
  saveAs?: string | null;
  fetchOptions?: Parameters<typeof fetch>[1];
};
export default function useDownloadFileToMyDevice() {
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [downloadingId, setDownloadFileId] = useState<string | null>(null);
  const handleDownloadFile = useCallback(
    async ({ fileId, from, saveAs, fetchOptions }: DownloadFileToMyDeviceParams) => {
      if (isDownloading) return false;
      if (!from || !saveAs) return false;
      setIsDownloading(true);
      setDownloadFileId(fileId || null);
      const [error, isSuccess] = await tryDo(downloadFileToMyDevice({ source: from, saveAs, fetchOptions }));
      setIsDownloading(false);
      setDownloadFileId(null);
      if (error || !isSuccess) return false;
      return true;
    },
    [isDownloading]
  );
  return {
    isDownloading,
    downloadingId,
    handleDownloadFile,
  };
}
