/* eslint-disable */
//@ts-nocheck
import type { FormComponent, FormProps } from '../_types';
export default function withApiSaveChanges(WrappedComponent: FormComponent): FormComponent {
  return function FormWithApiSaveChanges(props: FormProps) {
    const { id, loading, onSubmit, ...otherProps } = props;
    //TODO do api call to save
    return <WrappedComponent {...otherProps} id={id} loading={loading} />;
  };
}
