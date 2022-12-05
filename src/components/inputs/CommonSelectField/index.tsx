import CommonTextField from '@/components/inputs/CommonTextField';
import arrayOrEmpty from '@/helpers/formatHelpers/arrayOrEmpty';
import { Chip } from '@mui/material';
import type {
  AutocompleteInputChangeReason,
  AutocompleteOwnerState,
  AutocompleteRenderGetTagProps,
} from '@mui/material/Autocomplete';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import debounce from 'lodash/debounce';
import type { FC, SyntheticEvent, Ref } from 'react';
import { useMemo, forwardRef } from 'react';
import defaultRenderOption from './defaultRenderOption';
import type { TAutoCompleteOption, TCommonSelectFieldProps } from './_types';

const CommonSelectField: FC<TCommonSelectFieldProps> = forwardRef((props, ref?: Ref<unknown>) => {
  const {
    multiple,
    label,
    required,
    error,
    errorText,
    onInputChange,
    getOptionLabel,
    renderOption,
    filterOptions,
    renderTags,
    options: propOptions,
    loading,
    TextFieldProps,
    color,
    ...otherProps
  } = props;

  const memoOptions = useMemo(() => {
    return arrayOrEmpty(propOptions);
  }, [propOptions]);

  const memoRenderOption = useMemo(() => {
    if (typeof renderOption === 'function') return renderOption;
    return defaultRenderOption;
  }, [renderOption]);

  const memoGetOptionLabel = useMemo(() => {
    if (typeof getOptionLabel === 'function') return getOptionLabel;
    return (option: string | TAutoCompleteOption) => (typeof option === 'string' ? option : option?.label || '');
  }, [getOptionLabel]);

  const memoRenderTags = useMemo(() => {
    if (typeof renderTags === 'function') return renderTags;
    return (
      v: TAutoCompleteOption[],
      g: AutocompleteRenderGetTagProps,
      o: AutocompleteOwnerState<TAutoCompleteOption, boolean, boolean, boolean, 'div'>,
    ) => {
      return (
        <>
          {v?.map?.((opt, index) => (
            <Chip color={(color as any) || 'primary'} label={memoGetOptionLabel(opt)} {...g({ index })} />
          ))}
        </>
      );
    };
  }, [renderTags, memoGetOptionLabel, color]);

  const handleChangeTextDelay = useMemo(() => {
    return debounce((e: SyntheticEvent<Element, Event>, v: string, r: AutocompleteInputChangeReason) => {
      onInputChange?.(e, v, r);
    }, 400);
  }, [onInputChange]);

  return (
    <Autocomplete
      {...otherProps}
      color={color}
      multiple={multiple}
      filterOptions={typeof filterOptions === 'function' ? filterOptions : (opts, s) => opts}
      isOptionEqualToValue={(o, v) => o.value === v.value}
      renderTags={memoRenderTags}
      getOptionLabel={memoGetOptionLabel}
      options={memoOptions}
      loading={loading}
      onInputChange={handleChangeTextDelay}
      renderOption={memoRenderOption}
      disableCloseOnSelect={!!multiple}
      ref={ref}
      renderInput={(params) => (
        <CommonTextField
          {...params}
          {...TextFieldProps}
          {...(!!color ? { color: color as any } : {})}
          {...(!!label ? { label } : {})}
          {...(!!required ? { required } : {})}
          {...(!!error ? { error } : {})}
          {...(!!errorText ? { errorText } : {})}
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
});
export default CommonSelectField;
