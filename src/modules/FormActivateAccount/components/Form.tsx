import withHOCs from '@/hocs/withHocs';
import FormFields from './FormFields';
import withHookForm from '../hocs/withHookForm';
import withReduxActivateAccount from '../hocs/withReduxActivateAccount';
const Form = withHOCs(withReduxActivateAccount, withHookForm)(FormFields);
export default Form;
