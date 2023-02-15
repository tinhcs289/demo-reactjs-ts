import Grid from '@mui/material/Grid';
import { useMemo } from 'react';
import type { TFormGridItemProps } from './_types';

export default function FormGridItem(props: TFormGridItemProps) {
  const { children, disabledXs, contentProps, ...otherProps } = props;
  const xs = useMemo(() => {
    if (!disabledXs) return { xs: 12 };
    return {};
  }, [disabledXs]);
  return (
    <Grid item container {...xs} {...otherProps}>
      <Grid xs={12} {...contentProps} item>
        {children}
      </Grid>
    </Grid>
  );
}
