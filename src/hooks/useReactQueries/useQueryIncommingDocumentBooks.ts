import { http } from '@/api';
import getDefaultBackendEndpoint from '@/environments/getDefaultBackendEndpoint';
import callHttp from '@/functions/callHttp';
import { useQuery } from 'react-query';
const LINK = `${getDefaultBackendEndpoint()}/sovanban/get-all-so-den`;
export type IncommingDocumentBook = {
  Code?: string | null;
  DonVi?: string | null;
  DonViId?: string | null;
  Id?: string | null;
  IsDisabled?: boolean | null;
  IsKhongNhaySoTuDong?: boolean | null;
  IsKyHieuTheoDonVi?: boolean | null;
  IsKyHieuTheoLoaiVB?: boolean | null;
  IsKyHieuTheoSo?: boolean | null;
  IsSinhSoTheoLoaiVB?: boolean | null;
  IsVaoSoTuDong?: boolean | null;
  KyHieuBanHanh?: string | null;
  KyHieuValue?: number | null;
  LoaiSo?: string | null;
  LoaiSoId?: string | null;
  NamHoatDong?: number | null;
  Name?: string | null;
  NgayBatDau?: string | null;
  NgayKetThuc?: string | null;
  NgayTao?: string | null;
  ProcessDataType?: string | null;
  ProcessDataTypeId?: string | null;
  SoVanBanHienTai?: string | null;
  SuDung?: boolean | null;
  ThuTu?: number | null;
  TrangThai?: string | null;
};
export type Response = {
  Messages?: string;
  Data?: IncommingDocumentBook[];
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
export default function useQueryIncommingDocumentBooks() {
  return useQuery<IncommingDocumentBook[]>({
    queryKey: ['incommingDocumentBooks/all'],
    queryFn: getFromApi,
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}
