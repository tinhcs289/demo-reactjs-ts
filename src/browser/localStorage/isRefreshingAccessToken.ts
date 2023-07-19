import { newLocalStorageListenableItem } from '@/helpers/localStorageHelpers';
const isRefreshingAccessToken = newLocalStorageListenableItem<boolean>({ key: 'isRefreshingAccessToken' });
export default isRefreshingAccessToken;
