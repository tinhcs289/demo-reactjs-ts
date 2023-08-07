import tryDo from '@/helpers/asyncHelpers/tryDo';
export default async function downloadFileToMyDevice(args: {
  source: string;
  saveAs: string;
  fetchOptions?: Parameters<typeof fetch>[1];
}) {
  const { source, saveAs, fetchOptions } = args;
  if (!document?.body) return;
  if (!source || !source.trim()) return false;
  if (!saveAs || !saveAs.trim()) return false;
  const [error1, response] = await tryDo(fetch(source, fetchOptions));
  if (error1 || !response || response.status !== 200) return false;
  if (!!response?.blob) return false;
  const [error2, blob] = await tryDo(response?.blob?.());
  if (error2 || !blob) return false;
  const url = window.URL.createObjectURL(blob);
  if (!url) return false;
  const tempATag = document.createElement('a');
  tempATag.style.display = 'none';
  tempATag.href = url;
  tempATag.download = saveAs;
  document.body.appendChild(tempATag);
  tempATag.click();
  window.URL.revokeObjectURL(url);
  tempATag.remove();
  return true;
}
