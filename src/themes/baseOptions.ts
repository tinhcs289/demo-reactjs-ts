import type { ThemeOptions } from '@mui/material/styles';
/**
 * @see https://mui.com/material-ui/customization/default-theme/#main-content
 */
const baseOptions: ThemeOptions = {
  typography: {
    fontSize: 12,
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '8px',
          wordWrap: 'break-word' /* Internet Explorer 5.5+ */,
          whiteSpace: 'nowrap',
          // white-space: -moz-pre-wrap;   /* Mozilla */
          // white-space: -pre-wrap;       /* Chrome*/
          // white-space: -o-pre-wrap;     /* Opera 7 */
        },
      },
    },
  },
  // TODO [MUI] base theme here
};
export default baseOptions;
