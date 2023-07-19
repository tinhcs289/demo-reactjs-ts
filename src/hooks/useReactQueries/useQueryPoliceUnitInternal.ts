import { http } from '@/api';
import getDefaultBackendEndpoint from '@/environments/getDefaultBackendEndpoint';
import callHttp from '@/functions/callHttp';
import toEncodeUri from '@/helpers/stringHelpers/toEncodeUri';
import { useQuery } from 'react-query';
const LINK = toEncodeUri(`${getDefaultBackendEndpoint()}/don-vi-trong/get-opt-don-vi`, { isAllDonVi: true });
export type PoliceUnitInternal = {
  BitDauMoiPAKN?: boolean | null;
  Bit_DonViBoPhan?: boolean | null;
  CapDonVi?: number | null;
  Deep?: number | null;
  DonViChaId?: string | null;
  DuongDan_ID_DonVi?: string | null;
  DuongDan_ID_DonVi_Cha?: string | null;
  Email?: string | null;
  Fax?: string | null;
  HasDonViCon?: boolean | null;
  Id?: string | null;
  Level?: number | null;
  MaDonVi?: string | null;
  MaLienThong?: string | null;
  SoDienThoai?: string | null;
  TenDonVi?: string | null;
  TenDonViCha?: string | null;
  ThuTu?: number | null;
};
export type Response = {
  Messages?: string;
  Data?: PoliceUnitInternal[];
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
export default function useQueryPoliceUnitInternal() {
  return useQuery<PoliceUnitInternal[]>({
    queryKey: ['policeUnitInternal/all'],
    queryFn: getFromApi,
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}
