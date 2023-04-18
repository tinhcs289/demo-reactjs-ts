import withHOCs from '@/hocs/withHocs';
import FormFields from './FormFields';
import withDialog from '../hocs/withDialog';
import withHookForm from '../hocs/withHookForm';
import withReduxActivateAccount from '../hocs/withReduxActivateAccount';
const FormDialog = withHOCs(withReduxActivateAccount, withDialog, withHookForm)(FormFields);
export default FormDialog;
