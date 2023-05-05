import { FormGridFieldsVertical } from '@/components/form';
import type { FormProps } from '../_types';
import { fields } from '../constants';
export default function FormFields1(props: FormProps) {
  return <FormGridFieldsVertical fields={fields} />;
}
