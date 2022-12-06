const getEnvironmentName = () => {
  return process.env.REACT_APP_ENV_NAME || '';
};
export default getEnvironmentName;
