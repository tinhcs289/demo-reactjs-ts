import { FormGridFields } from '@/components/form';
import type { FormProps } from '../_types';
import { fields } from '../constants';
export default function FormFields1(_props: FormProps) {
  return <FormGridFields fields={fields} />;
}
