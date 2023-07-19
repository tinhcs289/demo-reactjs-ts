import EMPTY_GUID from '@/helpers/stringHelpers/EMPTY_GUID';
import type { ApiPayload, ApiReturns } from './_types';
type OrginalResponseData = {
  Messages: null;
  Data: {
    AccessToken?: string | null;
    RefreshToken?: string | null;
    Principal?: {
      UserId?: string | null;
      Username?: string | null;
      CanBoViewModel?: {
        CanBoId?: string | null;
        TenCanBo?: string | null;
        CanBoPositionMappingModels?: {
          DonViId?: string | null;
          TenDonVi?: string | null;
          ChucVuId?: string | null;
          TenChucVu?: string | null;
          PhamViId?: string | null;
          TenPhamVi?: string | null;
          DonViCoDau?: boolean | null;
          [x: string]: any;
        } | null;
        NguoiUyQuyenId?: string | null;
        DonViUyQuyenId?: string | null;
        ChucVuNguoiUyQuyenId?: string | null;
        NguoiDuocUyQuyenId?: string | null;
        DonViDuocUyQuyenId?: string | null;
        ChucVuNguoiDuocUyQuyenId?: string | null;
        UserNguoiUyQuyenId?: string | null;
        IsUyQuyen?: boolean | null;
        RefreshToken?: string | null;
        [x: string]: any;
      } | null;
      Permissions?: any;
      IsLanhDao?: boolean | null;
      IsUyQuyen?: boolean | null;
      IsXemVanBanDenDonVi?: boolean | null;
      IsPhanXuLyVanBanDen?: boolean | null;
      [x: string]: any;
    } | null;
    Roles?: Array<string> | null;
    Permissions?: Array<{
      Id?: string | null;
      Name?: string | null;
      DisplayName?: string | null;
      [x: string]: any;
    }> | null;
    DuocUyQuyen?: boolean | null;
    DuocTaoUyQuyen?: boolean | null;
    [x: string]: any;
  };
  ValidationResult?: any;
  IsSuccess?: boolean | null;
  Code?: string | number | null;
  [x: string]: any;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type OrginalAuthenticateDecode = {
  UserId: string;
  nameid: string;
  unique_name: string;
  CanBoInfo: string;
  IsXemVanBanDenDonVi: 'True' | 'False' | null;
  IsPhanXuLyVanBanDen: 'True' | 'False' | null;
  nbf: number;
  exp: number;
  iat: number;
  [x: string]: any;
};
function migrateResponseData(orginal?: OrginalResponseData): ApiReturns | null {
  if (!orginal) return null;
  if (!orginal?.Data?.AccessToken) return null;
  if (!orginal?.Data?.RefreshToken) return null;
  //@ts-ignore
  const migrated: ApiReturns = {};
  migrated.jwt = {
    accessToken: orginal.Data.AccessToken,
    refreshToken: orginal.Data.RefreshToken,
    expires: 3600,
  };
  try {
    migrated.hasNotBeenActivated = false;
    migrated.user = {
      displayname: orginal?.Data?.Principal?.CanBoViewModel?.TenCanBo || '',
      id: orginal?.Data?.Principal?.UserId || EMPTY_GUID,
      username: orginal?.Data?.Principal?.Username || '',
      email: '',
      phone: '',
      avatar: '',
      firstName: '',
      lastName: '',
      middleName: '',
      roles:
        orginal?.Data?.Roles?.map((r) => ({
          id: EMPTY_GUID,
          key: '',
          name: r || '',
          permissions: [],
        })) || [],
      policies:
        orginal?.Data?.Permissions?.map?.((p) => ({
          id: p?.Id || EMPTY_GUID,
          name: p?.DisplayName || '',
          key: p?.Name || '',
        })) || [],
    };
    return migrated;
  } catch (error) {
    console.log(error);
    return null;
  }
}
type OrginalPayload = {
  AppCode: string;
  CaptchaToken: string;
  Password: string;
  Username: string;
};
function migratePayload(payload: ApiPayload): OrginalPayload {
  return {
    AppCode: 'QLVB',
    CaptchaToken: '',
    Username: payload.username,
    Password: payload.password,
  };
}
const migrate = {
  migrateResponseData,
  migratePayload,
};
export default migrate;
