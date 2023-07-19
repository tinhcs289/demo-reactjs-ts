import { http } from '@/api';
import getDefaultBackendEndpoint from '@/environments/getDefaultBackendEndpoint';
import callHttp from '@/functions/callHttp';
import { useQuery } from 'react-query';
const LINK = `${getDefaultBackendEndpoint()}/VanBan/LoadOptionDoKhan`;
export type UrgencyDegree = {
  Id: string;
  Name: string;
  IsDefault?: boolean;
};
export type Response = {
  Messages?: string;
  Data?: UrgencyDegree[];
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
export default function useQueryUrgencyDegrees() {
  return useQuery<UrgencyDegree[]>({
    queryKey: ['urgencyDegree/all'],
    queryFn: getFromApi,
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}
