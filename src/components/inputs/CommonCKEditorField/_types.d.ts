import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import type { SxProps, Theme } from '@mui/material';
import type { ReactNode } from 'react';
export type CommonCKEditorFieldProps = Omit<
  ConstructorParameters<typeof CKEditor<ClassicEditor>>[0],
  'editor' | 'data'
> & {
  value?: string;
  label?: ReactNode;
  required?: boolean;
  error?: boolean;
  errorText?: ReactNode;
  helperText?: ReactNode;
  sx?: SxProps<Theme>;
};