import { http } from '@/api/_axios';
import getDefaultBackendEndpoint from '@/environments/getDefaultBackendEndpoint';
import callHttp from '@/helpers/asyncHelpers/callHttp';
import arrayOrEmpty from '@/helpers/formatHelpers/arrayOrEmpty';
import toEncodeUri from '@/helpers/stringHelpers/toEncodeUri';
export type ApiPayload = {
  processId: string;
  taskId: string;
  donViId?: string;
};
export type OfficerInfo = {
  CanBoId?: string | null;
  CapDonVi?: number | null;
  ChuTri?: boolean | null;
  ChucVu?: string | null;
  ChucVuCustom?: string | null;
  ChucVuId?: string | null;
  Deep?: number | null;
  DonViId?: string | null;
  DuongDan_ID_DonVi?: string | null;
  DuongDan_ID_DonVi_Cha?: string | null;
  HasChild?: boolean | null;
  Id?: string | null;
  IdInt?: number | null;
  IsCaNhan?: boolean | null;
  IsCoVanThu?: boolean | null;
  IsDaPhanXL?: boolean | null;
  IsDelete?: boolean | null;
  IsDonVi?: boolean | null;
  IsEdit?: boolean | null;
  IsEditChuTri?: boolean | null;
  IsEditNhanDeBiet?: boolean | null;
  IsEditPhoiHop?: boolean | null;
  IsEditVanBanGiay?: boolean | null;
  IsLanhDaoNhanBaoCao?: boolean | null;
  IsOld?: boolean | null;
  IsVanThu?: boolean | null;
  IsVirtualDepartment?: boolean | null;
  LanhDao?: boolean | null;
  NhanDeBiet?: boolean | null;
  OwnerTypeId?: string | null;
  OwnerTypeName?: string | null;
  ParentId?: string | null;
  ParentIdInt?: number | null;
  PhamViNguoiTaoId?: string | null;
  PhanXuLyChaId?: string | null;
  PhanXuLyId?: string | null;
  PhoiHop?: boolean | null;
  TaskId?: string | null;
  Ten?: string | null;
  TenCustom?: string | null;
  TenDonVi?: string | null;
  TenDonViKhongDau?: string | null;
  TenKhongDau?: string | null;
  TenTaiKhoan?: string | null;
  ThuTu?: number | null;
  Type?: 'CANBO' | 'DONVI';
  VanBanGiay?: boolean | null;
  XuLyNhiemVuId?: string | null;
  isCellExpanded?: boolean | null;
};
export type ApiReturns = {
  Code: unknown;
  Data?: OfficerInfo[] | null;
  IsSuccess?: boolean | null;
  Messages?: string | string[] | null;
  ValidationResult?: unknown;
};
const ROOT = getDefaultBackendEndpoint();
const LINK = `${ROOT}/qlvb/van-ban-den/phan-xu-ly/get-all-don-vi-es`;
export default async function api(payload: ApiPayload): Promise<OfficerInfo[]> {
  if (!payload?.taskId || !payload?.processId) return [];
  const url = toEncodeUri(LINK, payload);
  const [error, data] = await callHttp<ApiReturns>(async () => http.get(url)).waitFor(
    (r) => Array.isArray(r?.data?.Data) && r?.data?.Data.length > 0
  );
  if (!!error) return [];
  return arrayOrEmpty(data?.Data);
}
