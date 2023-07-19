import http from '@/api/http';
import getDefaultBackendEndpoint from '@/environments/getDefaultBackendEndpoint';
import callHttp from '@/functions/callHttp';
import type { OnQueryArgs, OnQueryReturns } from '@/functions/createAsyncListContextWithComponents';
import arrayOrEmpty from '@/helpers/formatHelpers/arrayOrEmpty';
import intOrDefault from '@/helpers/formatHelpers/intOrDefault';
import type { AxiosResponse } from 'axios';
import type { QueryParams, RowData, RowDataStatus } from '../../_types';
const LINK = `${getDefaultBackendEndpoint()}/vanban/getdanhsachvanban`;
type DateRange = {
  FromDate?: string | null;
  ToDate?: string | null;
  [x: string]: any;
};
type ApiPayload = {
  ChuTri?: string | null;
  DoKhanId?: string | null;
  DonViTraLai?: string | null;
  HanXuLy?: DateRange | null;
  HanXuLyEnd?: string | null;
  HanXuLyStart?: string | null;
  HasFile?: number | null;
  HasKySo?: number | null;
  Index?: number | null;
  IsChoYKien?: boolean | null;
  IsDaChoYKien?: boolean | null;
  IsDaPhanHoiYKien?: boolean | null;
  IsDanhSachEOffice?: boolean | null;
  IsInCharge?: boolean | null;
  KeySearch?: string | null;
  LoaiDuLieu?: string | null;
  LoaiVanBanId?: string | null;
  MaPhuongThucNhanVanBan?: string | null;
  MaTrangThai?: RowDataStatus[] | null;
  NgayBanHanh?: DateRange | null;
  NgayBanHanhEnd?: string | null;
  NgayBanHanhStart?: string | null;
  NgayDen?: DateRange | null;
  NgayDenEnd?: string | null;
  NgayDenStart?: string | null;
  NgayHoanThanh?: DateRange | null;
  NgayHoanThanhEnd?: string | null;
  NgayHoanThanhStart?: string | null;
  NgayNhanBanGiay?: DateRange | null;
  NgayNhanBanGiayEnd?: string | null;
  NgayNhanBanGiayStart?: string | null;
  NoiGui?: string | null;
  PhoiHop?: string | null;
  Size?: number | null;
  SoDen?: number | string | null;
  SoKyHieu?: string | null;
  SoPhu?: number | string | null;
  SoVanBanId?: string | null;
  TimKiemVanBanNangCaoModel?: {
    NgayDen?: string | null;
    NgayDenInt?: number | null;
    NgayPhanXuLy?: string | null;
    NgayPxlInt?: number | null;
    [x: string]: any;
  } | null;
  TrangThaiBaoCaoLanhDao?: number | null;
  TrangThaiXuLy?: number | null;
  TrichYeu?: string | null;
};
type ApiReturns = {
  Code?: unknown;
  Data?: {
    CurrentPage?: number | null;
    DataSource?: unknown;
    PageData?: RowData[] | null;
    PageSize?: number | null;
    TotalPage?: number | null;
    TotalRows?: number | null;
    [x: string]: any;
  };
  IsSuccess?: boolean | null;
  Messages?: unknown;
  ValidationResult?: unknown;
};
const defaultReturns: OnQueryReturns<RowData> = {
  result: [],
  totalCount: 0,
};
function dataIsValid(r: AxiosResponse<ApiReturns>) {
  if (!Number.isInteger(r?.data?.Data?.TotalRows)) return false;
  if (!(r?.data?.Data?.PageData instanceof Array)) return false;
  if (r.data.Data.PageData.length === 0) return false;
  return true;
}
export default async function getList(args: OnQueryArgs<QueryParams>): Promise<OnQueryReturns<RowData>> {
  let payload: Partial<ApiPayload> = {
    Index: args?.pageIndex || 1,
    Size: args?.pageSize || 10,
  };
  if (typeof args?.filter === 'object' && Object.keys(args?.filter).length > 0) {
    payload = { ...payload, ...(args.filter as any) };
  }
  const [error, data] = await callHttp<ApiReturns>(async () => http.post(LINK, payload)).waitFor(dataIsValid);
  if (error) return defaultReturns;
  const returns: OnQueryReturns<RowData> = {
    result: arrayOrEmpty(data?.Data?.PageData),
    totalCount: intOrDefault(data?.Data?.TotalRows, 0),
  };
  return returns;
}
