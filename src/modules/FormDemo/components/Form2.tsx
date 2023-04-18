import withHOCs from '@/hocs/withHocs';
import type { FormComponent } from '../_types';
import withHookForm from '../hocs/withHookForm';
import FormFields1 from './FormFields1';
const Form2 = withHOCs(withHookForm)(FormFields1 as FormComponent) as FormComponent;
export default Form2;
