import { EApiRequestStatus } from '@/constants/apiRequestStatus';
import { actions, activateAccountWithOtpRequestStatusSelector } from '@/redux/userAccount';
import { TBaseFormOnSubmitHandler } from '@/types';
import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { FormProps, FormType, FormValue } from './_types';
export default function withReduxActivateAccount(WrappedComponent: FormType): FormType {
  return function (props: FormProps) {
    const { loading, onSubmit: _, onClose, ...otherProps } = props;
    const dispatch = useDispatch();
    const requestStatus = useSelector(activateAccountWithOtpRequestStatusSelector);
    const isSuccess = useMemo(() => requestStatus === EApiRequestStatus.REQUESTSUCCESS, [requestStatus]);
    const handleSubmit: TBaseFormOnSubmitHandler<FormValue> = useCallback(
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
