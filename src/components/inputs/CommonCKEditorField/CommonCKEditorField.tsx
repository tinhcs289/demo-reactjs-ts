import FormGroupStyled from './FormGroupStyled';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import type { CommonCKEditorFieldProps } from './_types';
export default function CommonCKEditorField(props: CommonCKEditorFieldProps) {
  const { label, required, error, errorText, value, helperText, sx, ...otherProps } = props;
  return (
    <FormGroupStyled label={label} required={required} error={error} errorText={errorText} sx={sx}>
      <CKEditor {...otherProps} editor={ClassicEditor} data={value || ''} />
    </FormGroupStyled>
  );
}
