import { useFormContext } from 'react-hook-form';
export default function useRHFFieldError(fieldName: string) {
  //TODO: gây ra hiện tượng re-render cả form
  // cần tìm cách khắc phục
  const { getFieldState, formState } = useFormContext();
  const { error } = getFieldState(fieldName, formState);
  return error;
}
