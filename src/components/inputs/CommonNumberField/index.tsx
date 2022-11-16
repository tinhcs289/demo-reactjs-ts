import CommonTextField from '@/components/inputs/CommonTextField';
import debounce from 'lodash/debounce';
import React from 'react';
import { InputAttributes, NumberFormatValues, NumericFormat, SourceInfo } from 'react-number-format';
import { TCommonNumberFieldProps } from './types';

const CommonNumberField: React.FC<TCommonNumberFieldProps> = (props) => {
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

const withDebounceChangeHandler =
  (ms: number) => (WrappedComponent: React.FC<TCommonNumberFieldProps>) => (props: TCommonNumberFieldProps) => {
    const handleValueChangeDelay = React.useMemo(() => {
      return debounce((values: NumberFormatValues, sourceInfo: SourceInfo) => {
        props?.onValueChange?.(values, sourceInfo);
      }, ms);
    }, [props]);

    const handleChangeDelay = React.useMemo(() => {
      return debounce((e: React.ChangeEvent<any>) => {
        props?.onChange?.(e);
      }, ms);
    }, [props]);

    return <WrappedComponent {...props} onValueChange={handleValueChangeDelay} onChange={handleChangeDelay} />;
  };

export const CommonNumberFieldDebounced = withDebounceChangeHandler(300)(CommonNumberField);
