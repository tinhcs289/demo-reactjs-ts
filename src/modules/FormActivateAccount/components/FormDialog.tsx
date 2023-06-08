import { withRHF, withRHFSubmitHandler } from '@/components/form';
import withHOCs from '@/hocs/withHocs';
import withDisplayAsDialog from '../hocs/withDisplayAsDialog';
import withReduxActivateAccount from '../hocs/withReduxActivateAccount';
import withSubmitButton from '../hocs/withSubmitButton';
import FormFields from './FormFields';
const FormDialog = withHOCs(
  withReduxActivateAccount,
  withDisplayAsDialog,
  withRHF,
  withRHFSubmitHandler,
  withSubmitButton
)(FormFields);
export default FormDialog;
