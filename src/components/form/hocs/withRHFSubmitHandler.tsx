import { environmentIs } from '@/environments/getEnvironmentName';
import type { AnyObject, CommonFormOnClose, CommonFormProps } from '@/types';
import Grid from '@mui/material/Grid';
import type { ComponentType, FormEventHandler, MutableRefObject } from 'react';
import { createContext, useCallback, useContext, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
export type RHFSubmitContextValues = {
  formRef?: MutableRefObject<HTMLFormElement | undefined>;
  /**
   * Dispatch submit event manualy
   * @param reason reason for custom submit event: eg: "save_draft", "save_then_publish", ....
   * @returns
   */
  dispatchSubmit?: (reason?: string) => void;
  dispatchClose?: CommonFormOnClose;
};
const SubmitContext = createContext<RHFSubmitContextValues>({} as any);
/**
 * @example 
    const { dispatchSubmit, dispatchClose } = useRHFSubmitDispatch();
    //...submit form from somewhere in code 
    dispatchSubmit("save_draft");
    //...close form from somewhere in code
    dispatchClose({ reason: "force_close", feedback: {...someData }});
 */
export function useRHFSubmitDispatch() {
  return useContext(SubmitContext);
}
const isNotProduction = !environmentIs.production();
export default function withRHFSubmitHandler<FormValues extends AnyObject = AnyObject>(
  WrappedComponent: ComponentType<CommonFormProps<FormValues>>
) {
  return function FormWithSubmitHandler(props: CommonFormProps<FormValues>) {
    const { onSubmit, onClose, ...otherProps } = props;
    const { handleSubmit } = useFormContext<FormValues>();
    const handleSubmitOverride: FormEventHandler<HTMLFormElement> = useCallback(
      (event) => {
        event?.preventDefault?.();
        event?.stopPropagation?.();
        handleSubmit(function (formData) {
          const reason = reasonRef?.current || 'main_action';
          if (isNotProduction) {
            console.log({ formData, reason });
          }
          onSubmit?.(formData, reason);
          reasonRef.current = null;
        })(event);
      },
      [handleSubmit, onSubmit]
    );
    const formRef = useRef<HTMLFormElement>();
    const reasonRef = useRef<string | null | undefined>(null);
    const dispatchSubmit = useCallback((reason?: string) => {
      if (!formRef?.current?.dispatchEvent) return;
      if (typeof formRef.current.dispatchEvent !== 'function') return;
      reasonRef.current = null;
      const SubmitEvent = new Event('submit', { cancelable: true, bubbles: true });
      reasonRef.current = reason || 'main_action';
      return formRef.current.dispatchEvent(SubmitEvent);
    }, []);
    const dispatchClose: CommonFormOnClose = useCallback(
      (onCloseParams) => {
        onClose?.(onCloseParams);
      },
      [onClose]
    );
    return (
      <SubmitContext.Provider value={{ formRef, dispatchSubmit, dispatchClose }}>
        <Grid
          component="form"
          ref={formRef as any}
          onSubmit={handleSubmitOverride}
          noValidate
          width="100%"
          container
          alignItems="flex-start"
        >
          <WrappedComponent {...otherProps} onClose={onClose} />
        </Grid>
      </SubmitContext.Provider>
    );
  };
}
