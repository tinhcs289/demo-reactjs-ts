import withHOCs from '@/hocs/withHocs';
import type { FormComponent } from '../_types';
import { withRHF, withRHFSubmitHandler } from '@/components/form';
import withSubmitButton from '../hocs/withSubmitButton';
import FormFields1 from './FormFields1';
const Form1 = withHOCs(
  withRHF(),
  withRHFSubmitHandler,
  withSubmitButton
)(FormFields1 as FormComponent) as FormComponent;
export default Form1;
