import { ChangeColumnVisibilityIconButton } from '@/components/table';
import type { GridProps } from '@mui/material/Grid';
import Grid from '@mui/material/Grid';
export default function ChangeColumnVisibility(props: Partial<GridProps>) {
  return (
    <Grid item {...props}>
      <ChangeColumnVisibilityIconButton />
    </Grid>
  );
}
