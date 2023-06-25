import baseOptions from '@/themes/baseOptions';
import type { ThemeOptions } from '@mui/material/styles';
/**
 * @see https://mui.com/material-ui/customization/default-theme/#main-content
 */
const darkThemeOptions: ThemeOptions = {
  typography: baseOptions.typography,
  palette: {
    mode: 'dark',
  },
  // TODO [MUI] custom dark theme here
};
export default darkThemeOptions;
