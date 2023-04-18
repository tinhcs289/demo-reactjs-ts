import { EApiRequestStatus } from '@/constants/apiRequestStatus';
import { actions, activateAccountWithOtpRequestStatusSelector } from '@/redux/userAccount';
import { GenericFormOnSubmitHandler } from '@/types';
import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { FormProps, FormComponent, FormValues } from '../_types';
export default function withReduxActivateAccount(WrappedComponent: FormComponent): FormComponent {
  return function (props: FormProps) {
    const { loading, onSubmit: _, onClose, ...otherProps } = props;
    const dispatch = useDispatch();
    const requestStatus = useSelector(activateAccountWithOtpRequestStatusSelector);
    const isSuccess = useMemo(() => requestStatus === EApiRequestStatus.REQUESTSUCCESS, [requestStatus]);
    const handleSubmit: GenericFormOnSubmitHandler<FormValues> = useCallback(
      (formData) => {
        if (!formData) return;
        dispatch(actions.requestActivateAccountWithOtp(formData));
      },
      [dispatch]
    );
    useEffect(() => {
      if (!isSuccess) return;
      onClose?.({ closedAfterSubmitSuccess: true });
    }, [isSuccess, onClose]);
    return <WrappedComponent {...otherProps} onClose={onClose} onSubmit={handleSubmit} />;
  };
}
