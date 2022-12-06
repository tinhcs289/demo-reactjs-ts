import newLocalStorageListenableItem from '@/helpers/localStorageHelpers/newLocalStorageListenableItem';
import { TAppContruction } from '@/_types/TAppContruction';

const isUnderContruction = newLocalStorageListenableItem<TAppContruction>({ key: 'isUnderContruction' });
export default isUnderContruction;
