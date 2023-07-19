import { http } from '@/api';
import getDefaultBackendEndpoint from '@/environments/getDefaultBackendEndpoint';
import callHttp from '@/functions/callHttp';
import toEncodeUri from '@/helpers/stringHelpers/toEncodeUri';
import { useQuery } from 'react-query';
import type { PoliceUnitExternal, Response } from './useQueryPoliceUnitExternal';
const LINK = toEncodeUri(`${getDefaultBackendEndpoint()}/DonViNgoai/get-all`, {
  size: 500,
  isLienThong: true,
});
export type { PoliceUnitExternal, Response };
async function getFromApi() {
  const [error, data] = await callHttp<Response>(http.get(LINK)).waitFor(
    (r) => r?.data?.Data instanceof Array
  );
  if (error) return [];
  return data.Data || [];
}
export default function useQueryPoliceUnitExternalTransition() {
  return useQuery<PoliceUnitExternal[]>({
    queryKey: ['policeUnitExternalTransition/all'],
    queryFn: getFromApi,
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}
