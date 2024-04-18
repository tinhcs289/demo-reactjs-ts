import { ButtonCommon } from '@/components/buttons';
import { FormGridItem, useGetPopperState, useRHFSubmitDispatch, useSetPopperState } from '@/components/form';
import { GridItem } from '@/components/grid';
import ClearIcon from '@mui/icons-material/Clear';
import type { MouseEventHandler } from 'react';
import { useCallback, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import type { FormComponent, FormProps } from '../_types';
import { defaultValues, fieldSx } from '../constants';
function ButtonClear() {
  const {
    reset,
    //formState: { isSubmitted },
  } = useFormContext();
  const { dispatchSubmit } = useRHFSubmitDispatch();
  const clearAppliedField = useSetPopperState();
  const appliedField = useGetPopperState((s) => s?.appliedField);
  const hasValues = useMemo(() => {
    return Array.isArray(appliedField) && appliedField.length > 0;
  }, [appliedField]);
  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      event?.stopPropagation?.();
      reset(defaultValues);
      setTimeout(() => {
        dispatchSubmit?.('clear_filter');
        clearAppliedField({ appliedField: [] });
      }, 0);
    },
    [reset, dispatchSubmit, clearAppliedField]
  );
  const $Button = useMemo(() => {
    //if (!isSubmitted) return null; // only show if one filter applied
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
  }, [hasValues, handleClick]); //, isSubmitted]);
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
