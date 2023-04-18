import withHOCs from '@/hocs/withHocs';
import withHookForm from '../hocs/withHookForm';
import withRegisterViaInternalApi from '../hocs/withRegisterViaInternalApi';
import withReturnUri from '../hocs/withReturnUri';
import FormFields from './FormFields';
const Form = withHOCs(withReturnUri, withRegisterViaInternalApi, withHookForm)(FormFields);
export default Form;
