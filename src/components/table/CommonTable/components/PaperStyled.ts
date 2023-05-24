import { styled } from '@mui/material';
import type { PaperProps } from '@mui/material/Paper';
import Paper from '@mui/material/Paper';
import { scrollWidth } from '../constants';
const PaperStyled = styled(Paper)<PaperProps>(({ theme }) => ({
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
}));
export default PaperStyled;