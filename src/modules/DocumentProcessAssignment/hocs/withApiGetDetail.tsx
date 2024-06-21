import type { FormComponent, FormProps } from '../_types';
export default function withApiGetDetail(WrappedComponent: FormComponent): FormComponent {
  return function FormContactWithApiGetDetail(props: FormProps) {
    const { id, loading, defaultValues, ...otherProps } = props;
    //TODO: do api call to get detail
    return <WrappedComponent {...otherProps} defaultValues={defaultValues} id={id} loading={loading} />;
  };
}
