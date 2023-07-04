import getEnvironmentName from '@/environments/getEnvironmentName';
import type { AnyObject, CommonFormProps } from '@/types';
import Grid from '@mui/material/Grid';
import type { ComponentType, FormEventHandler, MutableRefObject } from 'react';
import { createContext, useCallback, useContext, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
export type RHFSubmitContextValues = {
  formRef?: MutableRefObject<HTMLFormElement | undefined>;
  dispatchSubmit?: () => void;
};
const SubmitContext = createContext<RHFSubmitContextValues>({} as any);
export function useRHFSubmitDispatch() {
  return useContext(SubmitContext);
}
const isNotProduction = getEnvironmentName() !== 'production';
export default function withRHFSubmitHandler<FormValues extends AnyObject = AnyObject>(
  WrappedComponent: ComponentType<CommonFormProps<FormValues>>
) {
  return function FormWithSubmitHandler(props: CommonFormProps<FormValues>) {
    const { onSubmit, ...otherProps } = props;
    const { handleSubmit } = useFormContext<FormValues>();
    const handleSubmitOverride: FormEventHandler<HTMLFormElement> = useCallback(
      (event) => {
        event?.preventDefault?.();
        event?.stopPropagation?.();
        handleSubmit(function (formData) {
          if (isNotProduction) console.log(formData);
          onSubmit?.(formData);
        })(event);
      },
      [handleSubmit, onSubmit]
    );
    const formRef = useRef<HTMLFormElement>();
    const dispatchSubmit = useCallback(() => {
      if (!formRef?.current?.dispatchEvent) return;
      if (typeof formRef.current.dispatchEvent !== 'function') return;
      const SubmitEvent = new Event('submit', { cancelable: true, bubbles: true });
      return formRef.current.dispatchEvent(SubmitEvent);
    }, []);
    return (
      <SubmitContext.Provider value={{ formRef, dispatchSubmit }}>
        <Grid
          component="form"
          ref={formRef as any}
          onSubmit={handleSubmitOverride}
          noValidate
          width="100%"
          container
          alignItems="flex-start"
        >
          <WrappedComponent {...otherProps} />
        </Grid>
      </SubmitContext.Provider>
    );
  };
}
