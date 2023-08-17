import { default as endpoints_example } from '@/constants/endpoint.example';
import { default as endpoints_qlvb } from '@/constants/endpoint.qlvb';
import getBackendEndpointKey from '@/environments/getBackendEndpointKey';
const endpointsDict = {
  EXAMPLE: endpoints_example,
  QLVB: endpoints_qlvb,
};
const KEY = getBackendEndpointKey();
const endpoints = endpointsDict[KEY as keyof typeof endpointsDict];
export default endpoints;
