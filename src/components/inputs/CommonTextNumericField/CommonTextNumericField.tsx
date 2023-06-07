import CommonTextField from '@/components/inputs/CommonTextField';
import type { ComponentType } from 'react';
import type { InputAttributes } from 'react-number-format';
import { PatternFormat } from 'react-number-format';
import type { CommonTextNumericFieldProps } from './_types';
export default function CommonTextNumericField(props: CommonTextNumericFieldProps) {
  return (
    <PatternFormat
      customInput={CommonTextField as ComponentType<InputAttributes>}
      allowEmptyFormatting
      {...props}
    />
  );
}
