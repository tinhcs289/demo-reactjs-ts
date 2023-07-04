export type EnvironmentName = 'production' | 'development' | 'local' | '';
export default function getEnvironmentName(): EnvironmentName {
  return (process.env.REACT_APP_ENV_NAME || '') as EnvironmentName;
}
