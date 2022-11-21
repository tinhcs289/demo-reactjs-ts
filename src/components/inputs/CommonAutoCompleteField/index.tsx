import CommonTextField from '@/components/inputs/CommonTextField';
import arrayOrEmpty from '@/helpers/formatHelpers/arrayOrEmpty';
import type { AutocompleteInputChangeReason } from '@mui/material/Autocomplete';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import debounce from 'lodash/debounce';
import React from 'react';
import defaultRenderOption from './defaultRenderOption';
import type { TCommonAutoCompleteFieldProps } from './_types';

const CommonAutoCompleteField: React.FC<TCommonAutoCompleteFieldProps> = (props) => {
  const {
    label,
    onInputChange,
    renderOption,
    filterOptions,
    options: propOptions,
    loading,
    TextFieldProps,
    ...otherProps
  } = props;

  const memoOptions = React.useMemo(() => {
    return arrayOrEmpty(propOptions);
  }, [propOptions]);

  const handleChangeTextDelay = React.useMemo(() => {
    return debounce((e: React.SyntheticEvent<Element, Event>, text: string, reason: AutocompleteInputChangeReason) => {
      onInputChange?.(e, text, reason);
    }, 400);
  }, [onInputChange]);

  return (
    <Autocomplete
      multiple={false}
      {...otherProps}
      filterOptions={typeof filterOptions === 'function' ? filterOptions : (opts, s) => opts}
      isOptionEqualToValue={(option, value) => !!option?.value && option.value === value.value}
      getOptionLabel={(option) => (typeof option === 'string' ? option : option?.label || '')}
      options={memoOptions}
      loading={loading}
      onInputChange={handleChangeTextDelay}
      {...(typeof renderOption === 'function'
        ? { renderOption }
        : {
            renderOption: defaultRenderOption,
          })}
      renderInput={(params) => (
        <CommonTextField
          {...params}
          {...TextFieldProps}
          {...(!!label ? { label } : {})}
          InputLabelProps={{
            ...params?.InputLabelProps,
            ...(!label ? { shrink: false } : {}),
          }}
          InputProps={{
            ...params?.InputProps,
            ...TextFieldProps?.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : (
                  TextFieldProps?.InputProps?.endAdornment || params?.InputProps?.endAdornment
                )}
              </>
            ),
          }}
        />
      )}
    />
  );
};
export default CommonAutoCompleteField;
