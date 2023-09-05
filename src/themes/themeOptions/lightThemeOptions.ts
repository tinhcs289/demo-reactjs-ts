import baseOptions from '@/themes/themeOptions/baseOptions';
import type { ThemeOptions } from '@mui/material/styles';
/**
 * @see https://mui.com/material-ui/customization/default-theme/#main-content
 */
const lightThemeOptions: ThemeOptions = {
  shadows: baseOptions.shadows,
  typography: baseOptions.typography,
  components: baseOptions.components,
  // TODO [MUI] custom light theme here
};
export default lightThemeOptions;
