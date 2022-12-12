import newLocalStorageListenableItem from '@/helpers/localStorageHelpers/newLocalStorageListenableItem';
import type { PaletteMode } from '@mui/material';

const themeVariant = newLocalStorageListenableItem<PaletteMode>({ key: 'themeVariant' });
export default themeVariant;
