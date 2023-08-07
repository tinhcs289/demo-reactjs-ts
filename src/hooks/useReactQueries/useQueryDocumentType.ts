import { http } from '@/api';
import getDefaultBackendEndpoint from '@/environments/getDefaultBackendEndpoint';
import callHttp from '@/helpers/asyncHelpers/callHttp';
import { useQuery } from 'react-query';
const LINK = `${getDefaultBackendEndpoint()}/VanBan/LoadOptionLoaiVB`;
export type DocumentType = {
  CoTheThaoTac?: boolean | null;
  Code?: string | null;
  DocumentType?: string | null;
  DonViId?: string | null;
  Id?: string | null;
  IsCapSoDi?: boolean | null;
  IsDefault?: boolean | null;
  LoaiVanBanMacDinhId?: string | null;
  MacDinh?: boolean | null;
  Name?: string | null;
  SuDung?: boolean | null;
  TenVietTat?: string | null;
};
export type Response = {
  Messages?: string;
  Data?: DocumentType[];
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
export default function useQueryDocumentType() {
  return useQuery<DocumentType[]>({
    queryKey: ['documentType/all'],
    queryFn: getFromApi,
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}
