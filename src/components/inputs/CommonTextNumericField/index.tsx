import CommonTextField from '@/components/inputs/CommonTextField';
import debounce from 'lodash/debounce';
import React from 'react';
import type { InputAttributes, NumberFormatValues, SourceInfo } from 'react-number-format';
import { PatternFormat } from 'react-number-format';
import type { TCommonTextNumericFieldProps } from './_types';

const CommonTextNumericField: React.FC<TCommonTextNumericFieldProps> = (props) => {
  return (
    <PatternFormat
      customInput={CommonTextField as React.ComponentType<InputAttributes>}
      allowEmptyFormatting
      {...props}
    />
  );
};

export default CommonTextNumericField;

const withDebounceChangeHandler =
  (ms: number) =>
  (WrappedComponent: React.FC<TCommonTextNumericFieldProps>) =>
  (props: TCommonTextNumericFieldProps) => {
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

    return (
      <WrappedComponent {...props} onValueChange={handleValueChangeDelay} onChange={handleChangeDelay} />
    );
  };

export const CommonTextNumericFieldDebounced = withDebounceChangeHandler(300)(CommonTextNumericField);
