import getEnviromentName from '@/environments/getEnvironmentName';
import { createReduxStore } from '@/helpers/reduxHelpers';
import { default as reducers } from './combine';
const env = getEnviromentName();
const shouldEnabledDevTools = !!env && env !== 'production';
const store = createReduxStore(reducers, shouldEnabledDevTools);
export default store;
