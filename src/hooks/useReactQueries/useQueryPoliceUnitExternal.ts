import { http } from '@/api';
import getDefaultBackendEndpoint from '@/environments/getDefaultBackendEndpoint';
import callHttp from '@/functions/callHttp';
import toEncodeUri from '@/helpers/stringHelpers/toEncodeUri';
import { useQuery } from 'react-query';
const LINK = toEncodeUri(`${getDefaultBackendEndpoint()}/DonViNgoai/get-all`, {
  size: 500,
  isLienThong: false,
});
export type PoliceUnitExternal = {
  Id?: string | null;
  MaDonVi?: string | null;
  MaLienThong?: string | null;
  MaLienThongMoi?: string | null;
  Name?: string | null;
  NgaySua?: string | null;
  TenVietTat?: string | null;
};
export type Response = {
  Messages?: string;
  Data?: PoliceUnitExternal[];
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
export default function useQueryPoliceUnitExternal() {
  return useQuery<PoliceUnitExternal[]>({
    queryKey: ['policeUnitExternal/all'],
    queryFn: getFromApi,
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}
