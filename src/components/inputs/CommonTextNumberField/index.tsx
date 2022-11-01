import CommonTextField from '@/components/inputs/CommonTextField';
import { TextFieldProps } from '@mui/material/TextField';
import debounce from 'lodash/debounce';
import React from 'react';
import {
  InputAttributes,
  NumberFormatValues,
  NumericFormat,
  NumericFormatProps,
  SourceInfo,
} from 'react-number-format';

const CommonTextNumberField: React.FC<TextFieldProps & NumericFormatProps> = (props) => {
  return <NumericFormat customInput={CommonTextField as React.ComponentType<InputAttributes>} {...props} />;
};
export default CommonTextNumberField;

const withDebounceChangeHandler =
  (ms: number) =>
  (WrappedComponent: React.FC<TextFieldProps & NumericFormatProps>) =>
  (props: TextFieldProps & NumericFormatProps) => {
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

export const CommonTextNumberFieldDebounced = withDebounceChangeHandler(300)(CommonTextNumberField);
