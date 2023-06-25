import CommonCKEditorField from '@/components/inputs/CommonCKEditorField';
import type { RHFRenderInput } from '@/components/rhfInputs';
import { useCallback } from 'react';
import { Controller } from 'react-hook-form';
import type { RHFCKEditorProps } from './_types';
export default function RHFCKEditor(props: RHFCKEditorProps) {
  const { name, control, rules, shouldUnregister, defaultValue, ...inputProps } = props;
  const renderInput: RHFRenderInput = useCallback(
    ({ field: { onChange, onBlur, value, ref }, fieldState: { invalid, error } }) => {
      const _props: { [x: string]: any } = { ...inputProps };
      if (!!rules?.required) _props.required = true;
      if (!!error?.message) _props.errorText = error.message;
      return (
        <CommonCKEditorField
          value={value || undefined}
          onChange={(_event, editor) => {
            const data = editor.getData();
            onChange(data || '');
          }}
          onBlur={(_event, _editor) => {
            onBlur();
          }}
          error={invalid}
          {..._props}
        />
      );
    },
    [rules?.required, inputProps]
  );
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      {...(!!defaultValue ? { defaultValue } : {})}
      {...(typeof shouldUnregister === 'boolean' ? { shouldUnregister } : {})}
      render={renderInput}
    />
  );
}
