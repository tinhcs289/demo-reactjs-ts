/* eslint-disable */
//@ts-nocheck
import { FormGridFields } from '@/components/form';
import type { FormProps } from '../_types';
import { fields } from '../constants';
export default function FormFields(props: FormProps) {
  return <FormGridFields fields={fields} />;
}
