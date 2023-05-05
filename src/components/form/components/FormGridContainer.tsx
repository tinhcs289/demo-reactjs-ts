import { GridContainer } from '@/components/grid';
import type { SxProps, Theme } from '@mui/material';
import Box from '@mui/material/Box';
import { useMemo } from 'react';
import type { FormGridContainerProps } from '../_types';
import FormLoading from './FormLoading';
export default function FormGridContainer(props: FormGridContainerProps) {
  const { children, onSubmit, formProps, loading, ...otherProps } = props;
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
  return (
    <Box {...memoFormProps} component="form" onSubmit={onSubmit} sx={formSx}>
      {$loading}
      <GridContainer {...otherProps} fullHeight fullWidth>
        {children}
      </GridContainer>
    </Box>
  );
}
