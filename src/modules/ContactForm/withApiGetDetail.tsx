import type { FormType } from './_types';

export default function withApiGetDetail<T extends { [x: string]: any }>(
  WrappedComponent: FormType<T>
): FormType<T> {
  return function (props: FormType<T>) {
    const { id, loading, defaultValues, ...otherProps } = props;

    //TODO: do api call to get detail

    return <WrappedComponent {...otherProps} defaultValues={defaultValues} id={id} loading={loading} />;
  };
}
