import concatArray from '@/helpers/arrayHelpers/concatArray';
import type { ComponentType, Ref } from 'react';
import { useMemo, forwardRef } from 'react';
import type { GooglePlaceFieldProps, GooglePlaceOption } from '../_types';
import { isValidPlace } from '../functions';
/**
 * The autocomplete has no options.
 * In order for the function work properly,
 * some pre-fill options should be generated base on the property of `value`,
 * then append they to the property of `options`.
 */
export default function withAutoAppendValueToOptions(WrappedComponent: ComponentType<GooglePlaceFieldProps>) {
  return forwardRef(function CommonGooglePlaceFieldWithAutoAppendValueToOptions(
    props: GooglePlaceFieldProps,
    ref?: Ref<unknown>
  ) {
    const { multiple, value, options, ...otherProps } = props;
    const memoOptions = useMemo(() => {
      if (!value) return options;
      if (value instanceof Array && value.length === 0) return options;
      if (!multiple) {
        if (!isValidPlace(value as GooglePlaceOption)) return options || [];
        if (!options) return [value];
        if (options.findIndex((o) => o.value === (value as GooglePlaceOption).value) >= 0) return options;
        return [...options, value];
      } else {
        if (!(value instanceof Array && value.length > 0)) return options;
        if (!options) return value;
        if (options instanceof Array && options.length === 0) return value;
        const needToAppend = (value as GooglePlaceOption[]).filter((v) => {
          return !options.some((o) => o.value === v.value);
        });
        if (needToAppend.length === 0) return options;
        return concatArray(options, needToAppend);
      }
    }, [options, value, multiple]);
    return (
      <WrappedComponent
        {...otherProps}
        options={memoOptions as any}
        multiple={multiple}
        value={value}
        ref={ref}
      />
    );
  });
}
