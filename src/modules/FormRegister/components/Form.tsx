import { withRHF, withRHFSubmitHandler } from '@/components/form';
import withHOCs from '@/hocs/withHocs';
import withRegisterViaInternalApi from '../hocs/withRegisterViaInternalApi';
import withReturnUri from '../hocs/withReturnUri';
import withSubmitButton from '../hocs/withSubmitButton';
import FormFields from './FormFields';
const Form = withHOCs(
  withReturnUri,
  withRegisterViaInternalApi,
  withRHF,
  withRHFSubmitHandler,
  withSubmitButton
)(FormFields);
export default Form;
