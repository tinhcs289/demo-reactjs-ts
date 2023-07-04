import { withRHF, withRHFSubmitHandler } from '@/components/form';
import withHOCs from '@/hocs/withHocs';
import type { FormComponent } from '../_types';
import withClearButton from '../hocs/withClearButton';
import withDefaultValues from '../hocs/withDefaultValues';
import FormFields from './FormFields';
// import withSubmitButton from '../hocs/withSubmitButton';
import withScollableWrapper from '../hocs/withScollableWrapper';
const Form1 = withHOCs(
  withDefaultValues,
  withRHF,
  withRHFSubmitHandler,
  withClearButton,
  withScollableWrapper,
  //withSubmitButton
)(FormFields as FormComponent) as FormComponent;
export default Form1;
