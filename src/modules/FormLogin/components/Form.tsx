import { withRHF, withRHFSubmitHandler } from '@/components/form';
import withHOCs from '@/hocs/withHocs';
import withAccountActivateFormIfUserHasNotActivated from '../hocs/withAccountActivateFormIfUserHasNotActivated';
import withLoginViaSSO from '../hocs/withLoginViaSSO';
import withRedirectAfterLoginWithExternalQueryString from '../hocs/withRedirectAfterLoginWithExternalQueryString';
import withReduxAuthentication from '../hocs/withReduxAuthentication';
import withReturnUri from '../hocs/withReturnUri';
import withSubmitButton from '../hocs/withSubmitButton';
import FormFields from './FormFields';
const Form = withHOCs(
  withReturnUri,
  withRedirectAfterLoginWithExternalQueryString,
  withAccountActivateFormIfUserHasNotActivated,
  withReduxAuthentication,
  withLoginViaSSO,
  //
  withRHF,
  withRHFSubmitHandler,
  withSubmitButton
)(FormFields);
export default Form;
