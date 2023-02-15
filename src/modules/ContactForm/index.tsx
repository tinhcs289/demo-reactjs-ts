import withHOCs from '@/hocs/withHocs';
import Form from './Form';
import withApiGetDetail from './withApiGetDetail';
import withApiSaveChanges from './withApiSaveChanges';
import withHookForm from './withHookForm';
import type { TContactFormValue } from './_types';

export const ContactSubForm = Form;

const ContactForm = withHOCs(
  withApiGetDetail<TContactFormValue>,
  withApiSaveChanges<TContactFormValue>,
  withHookForm<TContactFormValue>
)(Form);
export default ContactForm;
