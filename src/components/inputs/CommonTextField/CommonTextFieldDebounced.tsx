import usePrevious from '@/hooks/usePrevious';
import debounce from 'lodash/debounce';
import type { ComponentType } from 'react';
import { createRef, useEffect, useMemo } from 'react';
import CommonTextField from './CommonTextField';
import type { TCommonTextFieldProps } from './_types';

const withDebounceChangeHandler =
  (ms: number) =>
  (WrappedComponent: ComponentType<TCommonTextFieldProps>) =>
  (props: TCommonTextFieldProps) => {
    const { value, defaultValue, ...otherProps } = props;

    const preDefaultValue = usePrevious(defaultValue);
    const preValue = usePrevious(value);
    const inputRef = createRef<HTMLInputElement | HTMLTextAreaElement>();

    const handleChangeDelay = useMemo(() => {
      return debounce((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        props?.onChange?.(e);
      }, ms);
    }, [props]);

    useEffect(() => {
      if (preDefaultValue === defaultValue) return;
      if (!inputRef?.current) return;
      inputRef.current.value = (defaultValue || '') as any;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultValue, inputRef]);

    useEffect(() => {
      if (preValue === value) return;
      if (!inputRef?.current) return;
      inputRef.current.value = (value || '') as any;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, inputRef]);

    return (
      <WrappedComponent
        {...otherProps}
        inputRef={inputRef}
        defaultValue={defaultValue || value}
        value={value}
        onChange={handleChangeDelay}
      />
    );
  };
const CommonTextFieldDebounced: ComponentType<TCommonTextFieldProps> =
  withDebounceChangeHandler(300)(CommonTextField);
export default CommonTextFieldDebounced;
