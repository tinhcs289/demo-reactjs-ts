import type { FormType } from './_types';

export default function withApiSaveChanges<T extends { [x: string]: any }>(
  WrappedComponent: FormType<T>
): FormType<T> {
  return function (props: FormType<T>) {
    const { id, loading, onSubmit, ...otherProps } = props;

    //TODO do api call to save

    return <WrappedComponent {...otherProps} id={id} loading={loading} />;
  };
}
