import withHOCs from '@/hocs/withHocs';
import type { FormComponent } from '../_types';
import withHookForm from '../hocs/withHookForm';
import FormFields2 from './FormFields2';
const Form2 = withHOCs(withHookForm)(FormFields2 as FormComponent) as FormComponent;
export default Form2;
