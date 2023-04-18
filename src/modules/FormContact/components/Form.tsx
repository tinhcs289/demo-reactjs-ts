import withHOCs from '@/hocs/withHocs';
import FormFields from './FormFields';
import withApiGetDetail from '../hocs/withApiGetDetail';
import withApiSaveChanges from '../hocs/withApiSaveChanges';
import withHookForm from '../hocs/withHookForm';
import type { FormComponent } from '../_types';
const Form = withHOCs(
  withApiGetDetail,
  withApiSaveChanges,
  withHookForm
)(FormFields as FormComponent) as FormComponent;
export default Form;
