import type { FormValues as FilterValues } from '../Filter/_types';
import { EnumDocumentStatus } from './enums';
export type RowDataStatus = `${EnumDocumentStatus}`;
export type RowData = {
  ActionDate?: string | null;
  AllChildrenTasks?: any[];
  CaNhanDuocXinYKien?: unknown;
  CanBoId?: string | null;
  ChildOwnerTaskId?: string | null;
  ChoPhepThaoTac?: boolean | null;
  ChuTri?: string | null;
  CoTheCapNhat?: boolean | null;
  CoTheNhanDaXem?: boolean | null;
  CoThePhanXuLy?: boolean | null;
  CoTheSaoChep?: boolean | null;
  CoTheSua?: boolean | null;
  CoTheThuHoi?: boolean | null;
  CoTheTraLai?: boolean | null;
  CoTheTuChoi?: boolean | null;
  CoTheVaoSo?: boolean | null;
  CoTheXoa?: boolean | null;
  CodeDoKhan?: string | null;
  DoKhan?: string | null;
  DoKhanId?: string | null;
  DonViNgoaiId?: string | null;
  DonViTrongId?: string | null;
  DonViVaoSoLanDauId?: string | null;
  FileDinhKem?: Array<{
    DaKySo?: boolean | null;
    DaKySoCoQuan?: boolean | null;
    DungLuong?: string | number | null;
    DuoiMoRong?: string | null;
    DuongDan?: string | null;
    Id?: string | null;
    IdFileGoc?: string | null;
    Index?: number | null;
    IsCanDelete?: boolean | null;
    IsSign?: boolean | null;
    KieuDinhKem?: string | null;
    LoaiFileDinhKem?: string | null;
    NgayTao?: string | null;
    NguoiTao?: string | null;
    NguoiTaoId?: string | null;
    PathFileGoc?: string | null;
    PathIOC?: string | null;
    ProcessId?: string | null;
    QrCreated: unknown;
    Ten?: string | null;
    [x: string]: any;
  }> | null;
  FileDinhKemJson?: string | null;
  HanXuLy?: string | null;
  HanXuLy_?: string | null;
  HasFile?: boolean | null;
  HasKySo?: boolean | null;
  Id?: string | number | null;
  IsBaoCaoLanhDao?: boolean | null;
  IsCaNhan?: boolean | null;
  IsChoYKien?: boolean | null;
  IsDaChoYKien?: boolean | null;
  IsDaPhanHoiYKien?: boolean | null;
  IsDanhSachDaTraLai?: boolean | null;
  IsEOffice?: boolean | null;
  IsLanhDao?: boolean | null;
  IsMpi?: boolean | null;
  IsNhanDeBiet?: boolean | null;
  IsReadOnly?: boolean | null;
  IsReadOnlyTaskAssignment?: boolean | null;
  IsScan?: boolean | null;
  IsThuTruongDonVi?: boolean | null;
  IsTrucVanBan?: boolean | null;
  IsVanBanBanHanh?: boolean | null;
  IsWarning?: boolean | null;
  IsYeuCauTraLai?: boolean | null;
  LanhDaoId?: string | null;
  LoaiDen?: unknown;
  LoaiDenId?: string | null;
  LoaiNguonDuLieu?: number | null;
  LoaiVanBan?: string | null;
  LoaiVanBanId?: string | null;
  MaDinhDanh?: string | null;
  MaPhuongThucNhanVanBan?: string | null;
  MaTrangThai?: RowDataStatus | null;
  NgayBanHanh?: string | null;
  NgayBanHanh_?: string | null;
  NgayDen?: string | null;
  NgayDen_?: string | null;
  NgayHanXuLy?: string | null;
  NgayHoanThanh?: string | null;
  NgayHoanThanhXuLy_?: string | null;
  NgayNhanBanGiay?: string | null;
  NgayNhanBanGiay_?: string | null;
  NgaySearch?: string | null;
  NgaySua?: string | null;
  NguoiKy?: string | null;
  NguoiTaoId?: string | null;
  NoiDungThuHoi?: string | null;
  NoiDungTraLai?: string | null;
  NoiGui?: string | null;
  OwnerTypeCode?: string | null;
  OwnerTypeCodeDonVi?: string | null;
  OwnerTypeId?: string | null;
  ParentOwnerTaskId?: string | null;
  PhamViId?: string | null;
  PhoiHop?: string | null;
  PhuongThucNhanVanBanId?: string | null;
  SoBan?: string | null;
  SoDen?: string | number | null;
  SoKyHieu?: string | null;
  SoPhu?: string | number | null;
  SoTrang?: string | number | null;
  SoVanBan?: string | null;
  SoVanBanId?: string | null;
  StatusId?: string | null;
  TaskId?: string | null;
  TaskParentId?: string | null;
  TaskXinYKienId?: string | null;
  TenDonViCaNhanThuHoi?: string | null;
  TenDonViCaNhanTraLai?: string | null;
  TenTrangThaiXuLy?: string | null;
  TrangThai?: string | number | null;
  TrangThaiVanBanDi?: number | null;
  TrangThaiXuLy?: number | null;
  TrichYeu?: string | null;
  UniqueId?: string | null;
  VanBanDen_BiTraLai?: boolean | null;
  VanBanDen_IsHoiBao?: boolean | null;
  VanBanDen_IsNhanBanGiay?: boolean | null;
  VanBanDen_IsQppl?: boolean | null;
  VanBanDiId?: string | null;
  VanThuId?: string | null;
  WDoKhan?: unknown;
  WTrangThai?: unknown;
  Weight?: unknown;
  [x: string]: any;
};
export type QueryParams = Partial<Omit<FilterValues, 'Status'>> & {
  Status?: RowDataStatus[];
};
