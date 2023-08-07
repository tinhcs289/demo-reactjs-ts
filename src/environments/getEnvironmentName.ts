import { Environment } from '@/constants/environments';
import { EnvironmentName } from '@/types/Environment';
export default function getEnvironmentName(): EnvironmentName {
  const envName = process.env.REACT_APP_ENV_NAME || '';
  const listEnv = Object.keys(Environment);
  if (listEnv.includes(envName)) return envName as EnvironmentName;
  return Environment.development;
}
