import { AnyObject } from '@/types';
import type { FormField } from '../_types';
export default function fieldGroup(
  args: Omit<FormField<AnyObject, 'field-group'>, 'inputType'>
): FormField<AnyObject, 'field-group'> {
  return { ...args, inputType: 'field-group' };
}
