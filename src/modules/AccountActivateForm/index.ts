import withHOCs from '@/hocs/withHocs';
import Form from './Form';
import withDialog from './withDialog';
import withHookForm from './withHookForm';
import withReduxActivateAccount from './withReduxActivateAccount';
const AccountActivateForm = withHOCs(withReduxActivateAccount, withHookForm)(Form as any);
const AccountActivateDialog = withHOCs(withReduxActivateAccount, withDialog, withHookForm)(Form as any);
export default AccountActivateForm;
export type { FormProps, FormType, FormValue } from './_types';
export { Form, AccountActivateDialog };

