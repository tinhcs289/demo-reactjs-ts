export default function getBackendEndpointKey() {
  return (process.env.REACT_APP_DEFAULT_ENDPOINT_KEY || 'EXAMPLE') as string;
}
