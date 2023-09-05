import baseOptions from '@/themes/themeOptions/baseOptions';
import type { ThemeOptions } from '@mui/material/styles';
/**
 * @see https://mui.com/material-ui/customization/default-theme/#main-content
 */
const darkThemeOptions: ThemeOptions = {
  shadows: baseOptions.shadows,
  typography: baseOptions.typography,
  palette: {
    mode: 'dark',
  },
  components: baseOptions.components,
  // TODO [MUI] custom dark theme here
};
export default darkThemeOptions;
