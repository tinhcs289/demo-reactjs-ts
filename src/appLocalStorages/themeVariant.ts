import { newLocalStorageListenableItem } from '@/helpers/localStorageHelpers';
import type { PaletteMode } from '@mui/material';
const themeVariant = newLocalStorageListenableItem<PaletteMode>({ key: 'themeVariant' });
export default themeVariant;
