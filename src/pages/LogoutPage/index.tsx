import withHOCs from '@/hocs/withHocs';
import withLogoutAction from './hocs/withLogoutAction';
// import withReduxAuthentication from './hocs/withReduxAuthentication';
import { default as Page } from './LogoutPage';
const LogoutPage = withHOCs(withLogoutAction)(Page);
export default LogoutPage;
export type { LogoutPageProps } from './_types';
