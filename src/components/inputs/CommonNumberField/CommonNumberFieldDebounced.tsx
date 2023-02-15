import debounce from 'lodash/debounce';
import type { ChangeEvent, ComponentType } from 'react';
import { useMemo } from 'react';
import type { NumberFormatValues, SourceInfo } from 'react-number-format';
import CommonNumberField from './CommonNumberField';
import type { TCommonNumberFieldProps } from './_types';

const withDebounceChangeHandler =
  (ms: number) =>
  (WrappedComponent: ComponentType<TCommonNumberFieldProps>) =>
  (props: TCommonNumberFieldProps) => {
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

const CommonNumberFieldDebounced: ComponentType<TCommonNumberFieldProps> =
  withDebounceChangeHandler(300)(CommonNumberField);
export default CommonNumberFieldDebounced;
