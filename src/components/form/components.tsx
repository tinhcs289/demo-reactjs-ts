import { CommonFallback } from '@/components/fallback';
import type { GridContainerProps, GridItemProps } from '@/components/grid';
import { GridContainer, GridItem } from '@/components/grid';
import render from '@/helpers/reactHelpers/render';
import type { SxProps, Theme } from '@mui/material';
import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import get from 'lodash/get';
import type { FormEventHandler, ReactNode } from 'react';
import { Fragment, useCallback, useMemo } from 'react';
import type { FieldValues } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import { COMPONENT_DICT } from './constants';
import type { FormField, FormGridProps } from './_types';
import withHOCs from '@/hocs/withHocs';
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
export type FormGridContainerProps = GridContainerProps & {
  onSubmit?: FormEventHandler<HTMLFormElement>;
  formProps?: BoxProps<'form'>;
  loading?: boolean;
};
export function FormGridContainer(props: FormGridContainerProps) {
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
export type FormGridItemProps = GridItemProps & {
  disabledXs?: boolean;
  label?: ReactNode;
};
export function FormGridItem(props: FormGridItemProps) {
  const { children, disabledXs, ...otherProps } = props;
  const xs = useMemo(() => {
    if (!disabledXs) return { xs: 12 };
    return {};
  }, [disabledXs]);
  return (
    <GridItem {...otherProps} {...xs}>
      {children}
    </GridItem>
  );
}
export function FormGridFields<T extends FieldValues>(props: FormGridProps<T>) {
  const { fields } = props;
  const { control } = useFormContext();
  const renderField = useCallback(
    (field: FormField<T, any>) => {
      const {
        name,
        label,
        inputType,
        rules,
        component,
        componentProps,
        componentSx,
        hocs,
        fields: _fields,
        ...itemProps
      } = field;
      if (!name) return null;
      if (_fields instanceof Array && _fields.length >= 0) {
        const subFields = _fields.map((sf) => ({
          ...sf,
          name: `${name as string}.${(sf?.name as string) || ''}`,
        }));
        return (
          <FormGridItem
            {...itemProps}
            key={field.name as any}
            contentProps={{ container: true, width: '100%', height: '100%', ...itemProps?.contentProps }}
          >
            <FormGridFields fields={subFields} />
          </FormGridItem>
        );
      }
      if (!inputType) return null;
      let input = component;
      if (!input) input = (COMPONENT_DICT as any)[inputType as any];
      if (!input) return <Fragment key={field.name as any} />;
      const inputProps: { [x: string]: any } = { name, label, rules, control, ...componentProps };
      if (!!componentProps?.sx || !!componentSx)
        inputProps['sx'] = {
          ...get(componentProps, 'sx', {}),
          ...componentSx,
        };
      if (hocs instanceof Array && hocs.length > 0) input = withHOCs(...hocs)(input);
      return (
        <FormGridItem {...itemProps} key={field.name as any}>
          {render(input, inputProps)}
        </FormGridItem>
      );
    },
    [control]
  );
  return <>{fields.map(renderField as any)}</>;
}
