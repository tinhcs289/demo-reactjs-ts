import CommonTextField from '@/components/inputs/CommonTextField';
import type { ComponentType } from 'react';
import { useCallback } from 'react';
import type { InputAttributes, NumberFormatValues } from 'react-number-format';
import { NumericFormat } from 'react-number-format';
import type { CommonNumberFieldProps } from './_types';
type IsAllowed = (values: NumberFormatValues) => boolean;
const isAllowedDefault: IsAllowed = (values) => values?.value?.length <= 16 || values?.value === '';
export default function CommonNumberField(props: CommonNumberFieldProps) {
  const { isAllowed, ...otherProps } = props;
  const isAllowedMemo: IsAllowed = useCallback(
    (values) => {
      if (typeof isAllowed !== 'function') return isAllowedDefault(values);
      return isAllowedDefault(values) && isAllowed(values) === true;
    },
    [isAllowed]
  );
  return (
    <NumericFormat
      customInput={CommonTextField as ComponentType<InputAttributes>}
      allowNegative={false}
      allowLeadingZeros={false}
      isAllowed={isAllowedMemo}
      {...otherProps}
    />
  );
}
