import { styled } from '@mui/material';
import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';

const PageContent = styled(Box)<BoxProps>(({ theme }) => ({
  background: theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.common.black,
  '& > div': {
    margin: '0 auto',
    [theme.breakpoints.up('md')]: {
      width: theme.breakpoints.values.md,
    },
    [theme.breakpoints.up('lg')]: {
      width: theme.breakpoints.values.lg,
    },
  },
}));
export default PageContent;
