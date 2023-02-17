import type { FormType, FormProps } from './_types';
export default function withApiSaveChanges(WrappedComponent: FormType): FormType {
  return function (props: FormProps) {
    const { id, loading, onSubmit, ...otherProps } = props;
    //TODO do api call to save
    return <WrappedComponent {...otherProps} id={id} loading={loading} />;
  };
}
