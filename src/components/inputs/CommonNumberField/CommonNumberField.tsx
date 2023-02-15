import CommonTextField from '@/components/inputs/CommonTextField';
import type { ComponentType } from 'react';
import React from 'react';
import type { InputAttributes } from 'react-number-format';
import { NumericFormat } from 'react-number-format';
import type { TCommonNumberFieldProps } from './_types';

const CommonNumberField: ComponentType<TCommonNumberFieldProps> = (props) => {
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
};
export default CommonNumberField;
