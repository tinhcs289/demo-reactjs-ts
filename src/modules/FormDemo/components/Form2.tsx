import { withRHF, withRHFSubmitHandler } from '@/components/form';
import withHOCs from '@/hocs/withHocs';
import type { FormComponent } from '../_types';
import withSubmitButton from '../hocs/withSubmitButton';
import FormFields2 from './FormFields2';
const Form2 = withHOCs(
  withRHF,
  withRHFSubmitHandler,
  withSubmitButton
)(FormFields2 as FormComponent) as FormComponent;
export default Form2;
