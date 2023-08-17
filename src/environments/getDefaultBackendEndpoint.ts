import getBackendEndpointKey from '@/environments/getBackendEndpointKey';
export default function getDefaultBackendEndpoint(): string {
  const KEY = getBackendEndpointKey();
  return (process.env[`REACT_APP_${KEY}_API`] || '') as string;
}
