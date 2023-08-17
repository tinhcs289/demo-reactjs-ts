import EMPTY_GUID from '@/helpers/stringHelpers/EMPTY_GUID';
import type { ApiPayload, ApiReturns } from './_types';
type OrginalResponseData = {
  Messages?: string | null;
  Data?: Array<{
    Id?: string | null;
    HoTen?: string | null;
    DonVi?: string | null;
    DonViCoDau?: boolean | null;
    ChucVu?: string | null;
    IdChucVu?: string | null;
    IdDonVi?: string | null;
    TenTaiKhoan?: string | null;
    Sdt?: string | null;
    CANumber?: string | null;
    NgaySinh?: string | null;
    GioiTinh?: unknown;
    Email?: string | null;
    PathAnhDaiDien?: string | null;
    PathChuKy?: string | null;
    User?: string | null;
    AnhDaiDien?: string | null;
    AnhChuKy?: string | null;
    AnhChuKyNhay?: string | null;
    ListIdDonVi?: string[] | null;
    ListDonVi?: string[] | null;
    TenDonVis?: string | null;
    ListIdChucVu?: string[] | null;
    ListChucVu?: string[] | null;
    TenChucVus?: string | null;
    IsVanThu?: boolean | null;
    IsLanhDao?: boolean | null;
    IsDonViAo?: boolean | null;
    ID_DonVi_Cha?: string | null;
    TenDonViCha?: string | null;
    [x: string]: any;
  }> | null;
  StatusCode?: number | null;
  IsSuccess?: boolean | null;
  [x: string]: any;
};
function migrateResponseData(orginal?: OrginalResponseData): ApiReturns | null {
  if (!orginal) return null;
  if (!orginal?.Data?.[0]?.Id) return null;
  const userInfo = orginal.Data[0];
  //@ts-ignore
  const migrated: ApiReturns = {
    id: userInfo.Id || EMPTY_GUID,
    username: userInfo.TenTaiKhoan || '',
    displayname: userInfo.HoTen || '',
    firstName: '',
    middleName: '',
    lastName: '',
    avatar: userInfo.PathAnhDaiDien || '',
    email: userInfo.PathAnhDaiDien || '',
    phone: userInfo.Sdt || '',
    orginalData: userInfo,
  };
  return migrated;
}
type OrginalPayload = string[];
function migratePayload(payload: ApiPayload): OrginalPayload {
  return [payload?.id || ''];
}
const migrate = {
  migrateResponseData,
  migratePayload,
};
export default migrate;
