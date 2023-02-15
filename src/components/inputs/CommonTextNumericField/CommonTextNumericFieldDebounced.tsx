import debounce from 'lodash/debounce';
import type { ComponentType } from 'react';
import React from 'react';
import type { NumberFormatValues, SourceInfo } from 'react-number-format';
import CommonTextNumericField from './CommonTextNumericField';
import type { TCommonTextNumericFieldProps } from './_types';

const withDebounceChangeHandler =
  (ms: number) =>
  (WrappedComponent: ComponentType<TCommonTextNumericFieldProps>) =>
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

const CommonTextNumericFieldDebounced: ComponentType<TCommonTextNumericFieldProps> =
  withDebounceChangeHandler(300)(CommonTextNumericField);
export default CommonTextNumericFieldDebounced;
