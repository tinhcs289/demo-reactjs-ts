import withHOCs from '@/hocs/withHocs';
// import withLoginViaInternalApi from './hocs/withLoginViaInternalApi';
import withAccountActivateFormIfUserHasNotActivated from './hocs/withAccountActivateFormIfUserHasNotActivated';
import withLoginViaSSO from './hocs/withLoginViaSSO';
import withRedirectAfterLoginWithExternalQueryString from './hocs/withRedirectAfterLoginWithExternalQueryString';
import withReduxAuthentication from './hocs/withReduxAuthentication';
import withReturnUri from './hocs/withReturnUri';
import { default as Page } from './LoginPage';
const LoginPage = withHOCs(
  withReturnUri,
  withRedirectAfterLoginWithExternalQueryString,
  // withLoginViaInternalApi,
  withAccountActivateFormIfUserHasNotActivated,
  withReduxAuthentication,
  withLoginViaSSO
)(Page);
export default LoginPage;
export type { LoginFormData, LoginPageProps } from './_types';

