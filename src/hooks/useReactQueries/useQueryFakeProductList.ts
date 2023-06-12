import { http } from '@/api';
import callHttp from '@/functions/callHttp';
import { useQuery } from 'react-query';
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
  const [error, data] = await callHttp<UserFake[]>(http.get('https://fakestoreapi.com/users')).waitFor(
    (r) => r?.data instanceof Array
  );
  if (error) return [];
  return data;
}
export default function useQueryFakeProductList() {
  const query = useQuery<UserFake[]>('fakeUser/all', getFromApi);
  return query;
}
