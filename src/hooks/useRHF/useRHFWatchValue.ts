import { useFormContext, useWatch } from 'react-hook-form';
export default function useRHFWatchValue<FieldValue>(fieldName: string) {
  const { control } = useFormContext();
  const value = useWatch({ control, name: fieldName }) as FieldValue;
  return value;
}
