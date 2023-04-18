import withHOCs from '@/hocs/withHocs';
import FormFields from './FormFields';
import withAccountActivateFormIfUserHasNotActivated from '../hocs/withAccountActivateFormIfUserHasNotActivated';
import withHookForm from '../hocs/withHookForm';
import withLoginViaSSO from '../hocs/withLoginViaSSO';
import withRedirectAfterLoginWithExternalQueryString from '../hocs/withRedirectAfterLoginWithExternalQueryString';
import withReduxAuthentication from '../hocs/withReduxAuthentication';
import withReturnUri from '../hocs/withReturnUri';
const Form = withHOCs(
  withReturnUri,
  withRedirectAfterLoginWithExternalQueryString,
  withAccountActivateFormIfUserHasNotActivated,
  withReduxAuthentication,
  withLoginViaSSO,
  withHookForm
)(FormFields);
export default Form;
