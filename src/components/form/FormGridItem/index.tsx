import type { GridProps } from '@mui/material/Grid';
import Grid from '@mui/material/Grid';

export default function FormGridItem(props: GridProps & { contentProps?: GridProps }) {
  const { children, contentProps, ...otherProps } = props;
  return (
    <Grid item container xs={12} {...otherProps}>
      <Grid xs={12} {...contentProps} item>
        {children}
      </Grid>
    </Grid>
  );
}
