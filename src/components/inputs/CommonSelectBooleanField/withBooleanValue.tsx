import type {
  AutoCompleteOption,
  CommonSelectFieldOnChange,
  CommonSelectFieldProps,
} from '@/components/inputs/CommonSelectField';
import type { ComponentType } from 'react';
import { useCallback, useMemo } from 'react';
import { FALSE, TRUE } from './constants';
import type { CommonSelectBooleanFieldProps } from './_types';

const withBooleanValue =
  (WrappedComponent: ComponentType<CommonSelectFieldProps>) => (props: CommonSelectBooleanFieldProps) => {
    const {
      value: valueProp,
      defaultValue: dfValueProp,
      labelTrue,
      labelFalse,
      onChange: propOnChange,
      inputRef,
      ...otherProps
    } = props;

    const trueValue: AutoCompleteOption = useMemo(
      () => ({ value: TRUE, label: labelTrue || 'Yes' }),
      [labelTrue]
    );
    const falseValue: AutoCompleteOption = useMemo(
      () => ({ value: FALSE, label: labelFalse || 'No' }),
      [labelFalse]
    );

    const options: AutoCompleteOption[] = useMemo(() => [trueValue, falseValue], [trueValue, falseValue]);

    const value: AutoCompleteOption | null | undefined = useMemo(() => {
      if (valueProp === true) return trueValue;
      if (valueProp === false) return falseValue;
      return undefined;
    }, [valueProp, trueValue, falseValue]);

    const defaultValue: AutoCompleteOption | null | undefined = useMemo(() => {
      if (dfValueProp === true) return trueValue;
      if (dfValueProp === false) return falseValue;
      return undefined;
    }, [dfValueProp, trueValue, falseValue]);

    const onChange: CommonSelectFieldOnChange = useCallback(
      (event, val, reason, details) => {
        const selected = val as AutoCompleteOption;
        if (!selected) {
          propOnChange?.(event, null, reason, details);
          return;
        }

        if (selected?.value === TRUE) {
          propOnChange?.(event, true, reason, details);
          return;
        }
        if (selected?.value === FALSE) {
          propOnChange?.(event, false, reason, details);
          return;
        }
      },
      [propOnChange]
    );

    return (
      <WrappedComponent
        multiple={false}
        {...otherProps}
        ref={inputRef}
        value={value}
        defaultValue={defaultValue}
        options={options}
        onChange={onChange}
      />
    );
  };
export default withBooleanValue;
