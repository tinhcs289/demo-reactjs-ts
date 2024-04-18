import type { FormComponent, FormProps } from '../_types';
import { FormStateProvider, FormStateInit } from '../context';
export default function withContextFormState(WrappedComponent: FormComponent): FormComponent {
  return function FormWithContextFormState(props: FormProps) {
    return (
      <FormStateProvider>
        <FormStateInit viewType={props?.viewType} loading={props?.loading} />
        <WrappedComponent {...props} />
      </FormStateProvider>
    );
  };
}
