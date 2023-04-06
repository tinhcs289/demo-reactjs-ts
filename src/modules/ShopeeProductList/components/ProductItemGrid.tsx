import Grid from '@mui/material/Grid';
import { ReactNode } from 'react';

export default function ProductItemGrid(props?: { children?: ReactNode }) {
  const { children } = props || {};
  return (
    <Grid item xs={6} sm={4} md={3} lg={2} container>
      <Grid item xs={12} sx={{ p: 1 }}>
        {children}
      </Grid>
    </Grid>
  );
}
