import type { FormComponent, FormProps } from '../_types';
export default function withApiSaveChanges(WrappedComponent: FormComponent): FormComponent {
  return function FormContactWithApiSaveChanges(props: FormProps) {
    const { id, loading, onSubmit, ...otherProps } = props;
    //TODO do api call to save
    return <WrappedComponent {...otherProps} id={id} loading={loading} />;
  };
}
