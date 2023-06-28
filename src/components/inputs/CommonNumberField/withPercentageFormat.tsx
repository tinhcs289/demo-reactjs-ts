import type { ComponentType } from 'react';
import { useCallback } from 'react';
import type { NumberFormatValues } from 'react-number-format';
import type { CommonNumberFieldProps } from './_types';
type IsAllowed = (values: NumberFormatValues) => boolean;
const isAllowedDefault: IsAllowed = (values) => {
  if (!values?.value) return true;
  if (!values?.floatValue) return true;
  return values.floatValue >= 0 && values.floatValue <= 100;
};
export default function withPercentageFormat(WrappedComponent: ComponentType<CommonNumberFieldProps>) {
  return function InputWithPercentageFormat(props: CommonNumberFieldProps) {
    const { isAllowed, ...otherProps } = props;
    const isAllowedMemo: IsAllowed = useCallback(
      (values) => {
        if (typeof isAllowed !== 'function') return isAllowedDefault(values);
        return isAllowedDefault(values) && isAllowed(values) === true;
      },
      [isAllowed]
    );
    return <WrappedComponent suffix=" %" {...otherProps} isAllowed={isAllowedMemo} />;
  };
}
