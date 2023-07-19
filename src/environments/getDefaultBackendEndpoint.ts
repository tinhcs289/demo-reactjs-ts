export default function getDefaultBackendEndpoint(): string {
  return (process.env.REACT_APP_AEQUITAS_API || '') as string;
}
