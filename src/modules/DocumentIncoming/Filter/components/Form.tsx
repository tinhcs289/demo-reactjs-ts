import {
  withDefaultValueProps,
  withRHF,
  withRHFPopperProvider,
  withRHFSubmitHandler,
} from '@/components/form';
import withHOCs from '@/hocs/withHocs';
import { ComponentType } from 'react';
import { FormProps } from '../_types';
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
)(FormFields as any) as ComponentType<FormProps>;
export default Form;
