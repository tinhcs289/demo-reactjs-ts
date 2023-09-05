import { GlobalStylesProps } from '@mui/material/GlobalStyles';
const scrollWidth = 1.2; // as spacing
const scrollbarStyleMaker: Required<GlobalStylesProps>['styles'] = (theme) => ({
  '*': {
    scrollBehavior: 'smooth',
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
    '& tbody > tr:hover > td': {
      background: theme.palette.action.hover,
      backdropFilter: 'blur(8px)',
    },
  },
});
export default scrollbarStyleMaker;
