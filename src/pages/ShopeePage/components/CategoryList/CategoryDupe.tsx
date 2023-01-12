import { styled } from '@mui/material';
import type { GridProps } from '@mui/material/Grid';
import Grid from '@mui/material/Grid';
import { HEIGHT } from './constants';

const CategoryDupe = styled(Grid)<GridProps>(({ theme }) => ({
  height: `${HEIGHT}px`,
  width: '100%',
  margin: 0,
  padding: 0,
}));
export default CategoryDupe;
