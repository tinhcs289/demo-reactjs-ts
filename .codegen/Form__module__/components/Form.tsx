//@ts-nocheck --entire-file
import { withRHF, withRHFSubmitHandler } from '@/components/form';
import withHOCs from '@/hocs/withHocs';
import type { FormComponent } from '../_types';
import withApiGetDetail from '../hocs/withApiGetDetail';
import withApiSaveChanges from '../hocs/withApiSaveChanges';
import withSubmitButton from '../hocs/withSubmitButton';
import FormFields from './FormFields';
const Form = withHOCs(
  withApiGetDetail,
  withApiSaveChanges,
  withRHF,
  withRHFSubmitHandler,
  withSubmitButton
)(FormFields as FormComponent) as FormComponent;
export default Form;
