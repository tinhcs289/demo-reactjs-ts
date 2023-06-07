import { EApiRequestStatus } from '@/constants/apiRequestStatus';
import { actions, activateAccountWithOtpRequestStatusSelector } from '@/redux/userAccount';
import { CommomFormOnSubmit } from '@/types';
import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { FormProps, FormComponent, FormValues } from '../_types';
export default function withReduxActivateAccount(WrappedComponent: FormComponent): FormComponent {
  return function (props: FormProps) {
    const { loading, onSubmit: onSubmitProps, onClose, ...otherProps } = props;
    const dispatch = useDispatch();
    const requestStatus = useSelector(activateAccountWithOtpRequestStatusSelector);
    const isSuccess = useMemo(() => requestStatus === EApiRequestStatus.REQUESTSUCCESS, [requestStatus]);
    const handleSubmit: CommomFormOnSubmit<FormValues> = useCallback(
      (values) => {
        if (!values) return;
        dispatch(actions.requestActivateAccountWithOtp(values));
        onSubmitProps?.(values);
      },
      [dispatch, onSubmitProps]
    );
    useEffect(() => {
      if (!isSuccess) return;
      onClose?.({ reason: 'after_success' });
    }, [isSuccess, onClose]);
    return <WrappedComponent {...otherProps} onClose={onClose} onSubmit={handleSubmit as any} />;
  };
}
