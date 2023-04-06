import debounce from 'lodash/debounce';
import type { ChangeEvent, ComponentType } from 'react';
import { useMemo } from 'react';
import type { NumberFormatValues, SourceInfo } from 'react-number-format';
import CommonNumberField from './CommonNumberField';
import type { CommonNumberFieldProps } from './_types';
function createNumberFieldDebounced(ms: number) {
  return function withDebounceChangeHandler(WrappedComponent: ComponentType<CommonNumberFieldProps>) {
    return function NumberFieldWithDebounceChangeHandler(props: CommonNumberFieldProps) {
      const handleValueChangeDelay = useMemo(() => {
        return debounce((values: NumberFormatValues, sourceInfo: SourceInfo) => {
          props?.onValueChange?.(values, sourceInfo);
        }, ms);
      }, [props]);
      const handleChangeDelay = useMemo(() => {
        return debounce((e: ChangeEvent<any>) => {
          props?.onChange?.(e);
        }, ms);
      }, [props]);
      return (
        <WrappedComponent {...props} onValueChange={handleValueChangeDelay} onChange={handleChangeDelay} />
      );
    };
  };
}
const CommonNumberFieldDebounced: ComponentType<CommonNumberFieldProps> =
  createNumberFieldDebounced(300)(CommonNumberField);
export default CommonNumberFieldDebounced;
