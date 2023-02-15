import type { SxProps, Theme } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useMemo } from 'react';
import FormLoading from './FormLoading';
import type { TFormGridContainerProps } from './_types';

export default function FormGridContainer(props: TFormGridContainerProps) {
  const { children, onSubmit, formProps, sx, loading, ...otherProps } = props;

  const memoFormProps = useMemo(() => {
    if (!formProps) return { noValidate: true };
    else return { noValidate: true, ...formProps };
  }, [formProps]);

  const $loading = useMemo(() => {
    if (!loading) return null;
    return <FormLoading />;
  }, [loading]);

  const formSx = useMemo(() => {
    const _sx: SxProps<Theme> = { ...formProps?.sx, m: 0, p: 0 };
    if (loading) (_sx as any).position = 'relative';
    return _sx;
  }, [loading, formProps?.sx]);

  const gridSx = useMemo(() => ({ width: '100%', height: '100%', ...sx }), [sx]);

  return (
    <Box {...memoFormProps} component="form" onSubmit={onSubmit} sx={formSx}>
      {$loading}
      <Grid {...otherProps} sx={gridSx} container>
        {children}
      </Grid>
    </Box>
  );
}
