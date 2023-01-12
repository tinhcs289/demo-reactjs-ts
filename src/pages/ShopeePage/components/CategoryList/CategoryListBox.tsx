import { styled } from '@mui/material';
import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import { HEIGHT } from './constants';

const CategoryListBox = styled(Box)<BoxProps>(({ theme }) => ({
  height: `${HEIGHT}px`,
  padding: 0,
  margin: theme.spacing(1, 0),
}));
export default CategoryListBox;
