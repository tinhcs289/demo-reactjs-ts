import { http } from '@/api';
import callHttp from '@/helpers/asyncHelpers/callHttp';
import { useQuery } from 'react-query';
const LINK = 'https://fakestoreapi.com/users';
export type UserFakeName = {
  firstname: string;
  lastname: string;
};
export type UserFakeAddressGeoLocate = {
  lat: string | number;
  long: string | number;
};
export type UserFakeAddress = {
  city: string;
  street: string;
  number: number;
  zipcode: string;
  geolocation: UserFakeAddressGeoLocate;
};
export type UserFake = {
  id: number;
  email: string;
  username: string;
  password: string;
  name: UserFakeName;
  address: UserFakeAddress;
  phone: string;
};
async function getFromApi() {
  const [error, data] = await callHttp<UserFake[]>(http.get(LINK)).waitFor((r) => r?.data instanceof Array);
  if (error) return [];
  return data;
}
export default function useQueryFakeUsers() {
  return useQuery<UserFake[]>({
    queryKey: ['fakeUser/all'],
    queryFn: getFromApi,
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}
