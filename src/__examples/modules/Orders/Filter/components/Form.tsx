import {
  withDefaultValueProps,
  withRHF,
  withRHFSubmitHandler,
  withRHFPopperProvider,
} from '@/components/form';
import withHOCs from '@/hocs/withHocs';
import type { FormComponent } from '../_types';
import { defaultValues } from '../constants';
import withClearButton from '../hocs/withClearButton';
import withScollableWrapper from '../hocs/withScollableWrapper';
import FormFields from './FormFields';
const Form = withHOCs(
  withRHFPopperProvider,
  withDefaultValueProps(defaultValues),
  withRHF(),
  withRHFSubmitHandler,
  withClearButton,
  withScollableWrapper
)(FormFields as FormComponent) as FormComponent;
export default Form;
