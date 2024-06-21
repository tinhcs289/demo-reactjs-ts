import {
  FormGridFields,
  withDefaultValueProps,
  withRHF,
  withRHFPopperProvider,
  withRHFSubmitHandler,
} from '@/components/form';
import withHOCs from '@/hocs/withHocs';
import { ComponentType } from 'react';
import { FormProps } from '../_types';
import { defaultValues, fields } from '../constants';
import withClearButton from '../hocs/withClearButton';
import withScollableWrapper from '../hocs/withScollableWrapper';
const Form = withHOCs(
  withRHFPopperProvider,
  withDefaultValueProps(defaultValues),
  withRHF(),
  withRHFSubmitHandler,
  withClearButton,
  withScollableWrapper
)(function FormFields(_props: FormProps) {
  return <FormGridFields fields={fields} />;
}) as ComponentType<FormProps>;
export default Form;
