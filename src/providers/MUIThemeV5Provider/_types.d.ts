import type { ThemeProviderProps } from '@mui/system';

export type MUIThemeV5ProviderProps<T> = Omit<ThemeProviderProps<T>, 'theme'>;
