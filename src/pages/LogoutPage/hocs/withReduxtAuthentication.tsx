import { EApiRequestStatus } from '@/constants/apiRequestStatus';
import PATHS from '@/constants/paths';
import { actions, logoutRequestStatusSelector } from '@/redux/authentication';
import type { ComponentType } from 'react';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { LogoutPageProps } from '../_types';
const redirectToNextPage = () => {
  if (!(!!window && !!window?.location && typeof window.location.replace === 'function')) return;
  window.location.replace(PATHS.login);
};
export default function withReduxAuthentication(WrappedComponent: ComponentType<LogoutPageProps>) {
  return function LogoutPageWithReduxAuthentication(props: LogoutPageProps) {
    const { onLogout: _, loading: loadingProp, ...otherProps } = props;
    const requestStatus = useSelector(logoutRequestStatusSelector);
    const loading = useMemo(() => requestStatus === EApiRequestStatus.REQUESTING, [requestStatus]);
    const isSuccess = useMemo(() => requestStatus === EApiRequestStatus.REQUESTSUCCESS, [requestStatus]);
    const dispatch = useDispatch();
    const handleLogout = async () => {
      dispatch(actions.requestLogout(null));
      return;
    };
    useEffect(() => {
      if (!isSuccess) return;
      redirectToNextPage();
    }, [isSuccess]);
    return <WrappedComponent {...otherProps} loading={loading} onLogout={handleLogout} />;
  };
}
