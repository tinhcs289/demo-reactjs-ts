import debounce from 'lodash/debounce';
import type { ComponentType } from 'react';
import React from 'react';
import type { NumberFormatValues, SourceInfo } from 'react-number-format';
import CommonTextNumericField from './CommonTextNumericField';
import type { CommonTextNumericFieldProps } from './_types';
function createNumericFieldDebounce(ms: number) {
  return function withDebounceChangeHandler(WrappedComponent: ComponentType<CommonTextNumericFieldProps>) {
    return function NumericFieldWithDebounceChangeHandler(props: CommonTextNumericFieldProps) {
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
  };
}
const CommonTextNumericFieldDebounced: ComponentType<CommonTextNumericFieldProps> =
  createNumericFieldDebounce(300)(CommonTextNumericField);
export default CommonTextNumericFieldDebounced;
