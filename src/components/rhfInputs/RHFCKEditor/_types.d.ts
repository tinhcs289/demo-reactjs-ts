import type { CommonCKEditorFieldProps } from '@/components/inputs/CommonCKEditorField';
import type { RHFInputProps } from '@/components/rhfInputs';
export type RHFCKEditorProps = CommonCKEditorFieldProps &
  RHFInputProps & {
    defaultValue?: string;
    id?: `${string}:ckeditor:${string}`;
  };
