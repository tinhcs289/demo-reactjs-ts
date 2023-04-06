import CommonFallback from '@/components/CommonFallback';
import render from '@/helpers/reactHelpers/render';
import type { SxProps, Theme } from '@mui/material';
import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import type { GridProps } from '@mui/material/Grid';
import Grid from '@mui/material/Grid';
import get from 'lodash/get';
import type { FormEventHandler, ReactNode } from 'react';
import { Fragment, useCallback, useMemo } from 'react';
import type { FieldValues } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import { COMPONENT_DICT } from './constants';
import type { FormField, FormGridProps } from './field-types';
const fallbackSx: SxProps<Theme> = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  opacity: `.25 !important`,
  borderRadius: 'inherit',
  zIndex: (t) => t?.zIndex?.appBar - 1,
};
function FormLoading() {
  return <CommonFallback sx={fallbackSx} />;
}
export type FormGridContainerProps = GridProps & {
  onSubmit?: FormEventHandler<HTMLFormElement>;
  formProps?: BoxProps<'form'>;
  loading?: boolean;
};
export function FormGridContainer(props: FormGridContainerProps) {
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
export type FormGridItemProps = GridProps & {
  contentProps?: GridProps;
  disabledXs?: boolean;
  label?: ReactNode;
};
export function FormGridItem(props: FormGridItemProps) {
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
export function FormGridFields<T extends FieldValues>(props: FormGridProps<T>) {
  const { fields } = props;
  const form = useFormContext();
  const renderField = useCallback(
    (field: FormField<T, any>, index: number, allFields: FormField<T, any>[]) => {
      const { name, label, inputType, rules, component, componentProps, componentSx, ...itemProps } = field;
      let input = component;
      if (!input) input = (COMPONENT_DICT as any)[inputType as any];
      if (!input) return <Fragment key={field.name as any} />;
      const inputProps = {
        name: name,
        control: form.control,
        label: label,
        rules: rules,
        ...componentProps,
        sx: {
          ...get(componentProps, 'sx', {}),
          ...componentSx,
        },
      };
      return (
        <FormGridItem {...itemProps} key={field.name as any}>
          {render(input, inputProps)}
        </FormGridItem>
      );
    },
    [form]
  );
  return <>{fields.map(renderField)}</>;
}
