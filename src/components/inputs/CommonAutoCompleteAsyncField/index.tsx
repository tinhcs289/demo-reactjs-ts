import Autocomplete, { AutocompleteInputChangeReason } from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { arrayOrEmpty } from 'helpers/arrays';
import debounce from 'lodash/debounce';
import React from 'react';
import defaultRenderOption from './defaultRenderOption';
import TextFieldSearch from './TextFieldSearch';
import { TAutoCompleteQueryOnRequestProps } from './types';

const AutoCompleteQueryOnRequest: React.FC<TAutoCompleteQueryOnRequestProps> = (props) => {
  const {
    label,
    onQuery,
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
      onQuery?.(text, reason);
    }, 400);
  }, [onQuery]);

  return (
    <Autocomplete
      multiple={false}
      {...otherProps}
      filterOptions={(opts, s) => opts}
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
        <TextFieldSearch
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
export default AutoCompleteQueryOnRequest;
