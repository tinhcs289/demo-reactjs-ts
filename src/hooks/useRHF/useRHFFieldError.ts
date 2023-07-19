import { useFormContext } from 'react-hook-form';
export default function useRHFFieldError(fieldName: string) {
  const { getFieldState, formState } = useFormContext();
  const { error } = getFieldState(fieldName, formState);
  return error;
}
