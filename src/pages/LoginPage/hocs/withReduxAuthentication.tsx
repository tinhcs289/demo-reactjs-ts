import { EApiRequestStatus } from '@/constants/apiRequestStatus';
import { actions, loginRequestStatusSelector } from '@/redux/authentication';
import PATHS from '@/routes/paths';
import type { ComponentType } from 'react';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { ILoginPageProps, TLoginFormData } from '../_types';

function redirectToNextPage(returnUri?: string) {
  if (!(!!window && !!window?.location && typeof window.location.replace === 'function')) return;
  window.location.replace(returnUri || PATHS.dashboard);
}

const withReduxAuthentication =
  (WrappedComponent: ComponentType<ILoginPageProps>) => (props: ILoginPageProps) => {
    const { onRequestLoginViaSSO: _, loading: loadingProp, returnUri, ...otherProps } = props;

    const requestStatus = useSelector(loginRequestStatusSelector);
    const loading = useMemo(() => requestStatus === EApiRequestStatus.REQUESTING, [requestStatus]);
    const isSuccess = useMemo(() => requestStatus === EApiRequestStatus.REQUESTSUCCESS, [requestStatus]);
    const dispatch = useDispatch();

    const handleRequestLoginViaApi = async (fd: TLoginFormData): Promise<void> => {
      if (!fd?.Account || !fd?.Password) return;

      const payload = {
        username: fd?.Account,
        password: fd?.Password,
      };

      dispatch(actions.requestLogin(payload));
    };

    useEffect(() => {
      if (!isSuccess) return;
      redirectToNextPage(returnUri);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess]);

    useEffect(() => {
      console.log(requestStatus)
    }, [requestStatus])

    return (
      <WrappedComponent {...otherProps} loading={loading} onSubmitLoginForm={handleRequestLoginViaApi} />
    );
  };
export default withReduxAuthentication;
