import withHOCs from '@/hocs/withHocs';
import withLogoutAction from '@/pages/LogoutPage/withLogoutAction';
import { ILogoutPage } from '@/pages/LogoutPage/_types';
import type { FC } from 'react';
import { useEffect } from 'react';

const LogoutPage: FC<ILogoutPage> = withHOCs(withLogoutAction)((props) => {
  const { onLogout } = props;

  useEffect(() => {
    onLogout?.();
  }, [onLogout]);

  return <></>;
});
export default LogoutPage;
