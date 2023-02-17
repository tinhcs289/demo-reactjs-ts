import type { FormType, FormProps } from './_types';
export default function withApiGetDetail(WrappedComponent: FormType): FormType {
  return function (props: FormProps) {
    const { id, loading, defaultValues, ...otherProps } = props;
    //TODO: do api call to get detail
    return <WrappedComponent {...otherProps} defaultValues={defaultValues} id={id} loading={loading} />;
  };
}
