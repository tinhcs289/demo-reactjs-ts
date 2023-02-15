import type { ComponentType } from 'react';
import type { IRegisterPageProps, TRegisterFormData } from './_types';

const withRegisterViaInternalApi =
  (WrappedComponent: ComponentType<IRegisterPageProps>) => (props: IRegisterPageProps) => {
    const { onSubmitRegisterForm: _, ...otherProps } = props;

    const handleRequestRegisterViaApi = (formData: TRegisterFormData) => {
      //TODO [Login] logic submit to api here
    };

    return <WrappedComponent {...otherProps} onSubmitRegisterForm={handleRequestRegisterViaApi} />;
  };
export default withRegisterViaInternalApi;
