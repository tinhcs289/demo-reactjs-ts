import withHOCs from '@/hocs/withHocs';
import Form from './Form';
import withApiGetDetail from './withApiGetDetail';
import withApiSaveChanges from './withApiSaveChanges';
import withHookForm from './withHookForm';
import type { FormType } from './_types';
const ContactForm = withHOCs(withApiGetDetail, withApiSaveChanges, withHookForm)(Form as any) as FormType;
export default ContactForm;
