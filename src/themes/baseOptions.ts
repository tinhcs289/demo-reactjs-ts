import type { ThemeOptions } from '@mui/material/styles';
import { GlobalStylesProps } from '@mui/material/GlobalStyles';
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
    MuiPagination: {
      styleOverrides: {
        root: {
          minHeight: '42px !important',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          //background: '#efefef',
        },
      },
    },
  },
  // TODO [MUI] base theme here
};
const scrollWidth = 1.2; // as spacing
export default baseOptions;
export const globalStyleMaker: Required<GlobalStylesProps>['styles'] = (theme) => ({
  '*': {
    scrollBehavior: 'smooth',
    //#region scroll bar
    '::-webkit-scrollbar': {
      width: theme.spacing(scrollWidth),
      height: theme.spacing(scrollWidth),
    },
    '::-webkit-scrollbar-track': {
      background: theme.palette.action.hover,
    },
    '::-webkit-scrollbar-thumb': {
      background: theme.palette.grey[400],
      borderRadius: theme.shape.borderRadius,
    },
    '::-webkit-scrollbar-thumb:hover': {
      cursor: 'pointer',
      background: theme.palette.grey[500],
      boxShadow: theme.shadows[2],
    },
    '::-webkit-scrollbar-thumb:active': {
      cursor: 'grab',
      background: theme.palette.primary.dark,
      boxShadow: theme.shadows[6],
    },
    '::-webkit-scrollbar-corner': {
      background: theme.palette.action.hover,
    },
    //#endregion
    //#region hover on row
    '& tbody > tr:hover > td': {
      background: theme.palette.action.hover,
      backdropFilter: 'blur(8px)',
    },
    //#endregion
  },
  // TODO [MUI] custom css here
});
