import CommonTextField from '@/components/inputs/CommonTextField';
import React from 'react';
import type { InputAttributes } from 'react-number-format';
import { NumericFormat } from 'react-number-format';
import type { CommonNumberFieldProps } from './_types';
export default function CommonNumberField(props: CommonNumberFieldProps) {
  const { isAllowed, ...otherProps } = props;
  return (
    <NumericFormat
      customInput={CommonTextField as React.ComponentType<InputAttributes>}
      allowNegative={false}
      allowLeadingZeros={false}
      isAllowed={(values) => values?.value?.length <= 16 && (isAllowed?.(values) || true)}
      {...otherProps}
    />
  );
}
