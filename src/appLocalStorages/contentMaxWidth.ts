import newLocalStorageListenableItem from '@/helpers/localStorageHelpers/newLocalStorageListenableItem';
import type { Breakpoint } from '@mui/material';

const contentMaxWidth = newLocalStorageListenableItem<Breakpoint>({ key: 'contentMaxWidth' });
export default contentMaxWidth;
