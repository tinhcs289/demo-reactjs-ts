import { http } from '@/api';
import getDefaultBackendEndpoint from '@/environments/getDefaultBackendEndpoint';
import callHttp from '@/functions/callHttp';
import { useQuery } from 'react-query';
const LINK = `${getDefaultBackendEndpoint()}/VanBan/LoadOptionPhuongThucNhanVanBan`;
export type DocumentReceivedType = {
  Code?: string | null;
  Id?: string | null;
  IsDefault?: boolean | null;
  Name?: string | null;
};
export type Response = {
  Messages?: string;
  Data?: DocumentReceivedType[];
  ValidationResult?: unknown;
  IsSuccess?: boolean;
  Code?: unknown;
};
async function getFromApi() {
  const [error, data] = await callHttp<Response>(http.get(LINK)).waitFor(
    (r) => r?.data?.Data instanceof Array
  );
  if (error) return [];
  return data.Data || [];
}
export default function useQueryDocumentReceivedType() {
  return useQuery<DocumentReceivedType[]>({
    queryKey: ['documentReceivedType/all'],
    queryFn: getFromApi,
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}
