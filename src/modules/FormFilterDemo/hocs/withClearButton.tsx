import { ButtonCommon } from '@/components/buttons';
import { FormGridItem } from '@/components/form';
import { useRHFFormValues } from '@/hooks/useRHF';
import isEqual from 'lodash/isEqual';
import type { MouseEventHandler } from 'react';
import { useCallback, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import type { FormComponent, FormProps, FormValues } from '../_types';
import { defaultValues, fieldSx } from '../constants';
import type { AnyObject } from '@/types';
import ClearIcon from '@mui/icons-material/Clear';
import { GridItem } from '@/components/grid';
function undefinedToNull(obj: AnyObject): any {
  if (typeof obj === 'undefined') return null;
  if (obj instanceof Array) return obj.length === 0 ? obj : null;
  if (typeof obj === 'function') return null;
  if (typeof obj === 'object')
    for (let key in obj) {
      obj[key] = undefinedToNull(obj[key]);
    }
  return obj;
}
const nullabledDefaultValues = undefinedToNull(defaultValues);
function ButtonClear() {
  const { reset } = useFormContext();
  const formValues = useRHFFormValues<FormValues>();
  const nullabledValues = useMemo(() => undefinedToNull(formValues), [formValues]);
  const hasValues = useMemo(() => {
    const isNotEqual = !isEqual(nullabledValues, nullabledDefaultValues);
    return isNotEqual;
  }, [nullabledValues]);
  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      event?.stopPropagation?.();
      reset(defaultValues);
    },
    [reset]
  );
  const $Button = useMemo(() => {
    if (!hasValues) return null;
    return (
      <FormGridItem disabledXs sx={{ ...fieldSx, flex: 'unset !important' }}>
        <ButtonCommon
          size="small"
          onClick={handleClick}
          variant="contained"
          color="secondary"
          noTextTransform
          startIcon={<ClearIcon />}
        >
          {`Xóa bộ lọc`}
        </ButtonCommon>
      </FormGridItem>
    );
  }, [hasValues, handleClick]);
  return $Button;
}
export default function withClearButton(WrappedComponent: FormComponent): FormComponent {
  return function FormWithClearButton(props: FormProps) {
    return (
      <GridItem contentProps={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <ButtonClear />
        <WrappedComponent {...props} />
      </GridItem>
    );
  };
}
