import withHOCs from '@/hocs/withHocs';
import withLogoutAction from './hocs/withLogoutAction';
import { ILogoutPage } from './_types';
import type { ComponentType } from 'react';
// import withReduxtAuthentication from './hocs/withReduxtAuthentication';
import { useEffect } from 'react';

const LogoutPage: ComponentType<ILogoutPage> = withHOCs(withLogoutAction)((props) => {
  const { onLogout } = props;
  useEffect(() => {
    onLogout?.();
  }, [onLogout]);

  return <></>;
});
export default LogoutPage;
