import { withRHF, withRHFSubmitHandler } from '@/components/form';
import withHOCs from '@/hocs/withHocs';
import withReduxActivateAccount from '../hocs/withReduxActivateAccount';
import withSubmitButton from '../hocs/withSubmitButton';
import FormFields from './FormFields';
const Form = withHOCs(withReduxActivateAccount, withRHF, withRHFSubmitHandler, withSubmitButton)(FormFields);
export default Form;
