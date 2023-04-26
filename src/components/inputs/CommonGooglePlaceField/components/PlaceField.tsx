import type { CommonTextFieldProps } from '@/components/inputs/CommonTextField';
import CommonTextField from '@/components/inputs/CommonTextField';
import arrayOrEmpty from '@/helpers/formatHelpers/arrayOrEmpty';
import { styled } from '@mui/material';
import type {
  AutocompleteInputChangeReason,
  AutocompleteRenderInputParams,
} from '@mui/material/Autocomplete';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import debounce from 'lodash/debounce';
import type { ComponentType, Ref, SyntheticEvent } from 'react';
import { forwardRef, useCallback, useMemo } from 'react';
import type { BaseAutocompleteProps, GooglePlaceFieldProps, SelectedPlaceTagsRender } from '../_types';
import {
  defaultFilterOptions,
  defaultGetOptionLabel,
  defaultRenderOption,
  isOptionEqualToValue,
} from '../functions';
const AutocompleteStyled = styled(Autocomplete)<BaseAutocompleteProps>(({ theme }) => ({
  '& div.MuiInputBase-root': {
    paddingRight: `${theme.spacing(0.5)} !important`,
  },
  '& input.MuiInputBase-input.MuiAutocomplete-input': {
    //padding: '0 !important',
  },
}));
const PlaceField: ComponentType<GooglePlaceFieldProps> = forwardRef(function PlaceFieldWithRef(
  props,
  ref?: Ref<unknown>
) {
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
    value,
    placeholder,
    ...otherProps
  } = props;
  const memoOptions = useMemo(() => arrayOrEmpty(propOptions), [propOptions]);
  const disableCloseOnSelect = useMemo(() => !!multiple, [multiple]);
  const memoValue = useMemo(() => value || (multiple ? [] : null), [value, multiple]);
  const memoRenderOption = useMemo(
    () => (typeof renderOption === 'function' ? renderOption : defaultRenderOption(!!multiple)),
    [renderOption, multiple]
  );
  const memoFilterOptions = useMemo(
    () => (typeof filterOptions === 'function' ? filterOptions : defaultFilterOptions),
    [filterOptions]
  );
  const memoGetOptionLabel = useMemo(
    () => (typeof getOptionLabel === 'function' ? getOptionLabel : defaultGetOptionLabel),
    [getOptionLabel]
  );
  const memoRenderTags: SelectedPlaceTagsRender = useMemo(() => {
    if (typeof renderTags === 'function') return renderTags;
    return (v, g, o) => (
      <>
        {v?.map?.((opt, index) => (
          <Chip
            size="small"
            color={(color as any) || 'primary'}
            label={memoGetOptionLabel(opt)}
            style={{ margin: '1px' }}
            {...g({ index })}
          />
        ))}
      </>
    );
  }, [renderTags, memoGetOptionLabel, color]);
  const handleChangeTextDelay = useMemo(() => {
    return debounce((e: SyntheticEvent<Element, Event>, v: string, r: AutocompleteInputChangeReason) => {
      onInputChange?.(e, v, r);
    }, 400);
  }, [onInputChange]);
  const memoRenderInput = useCallback(
    (params: AutocompleteRenderInputParams) => {
      const _props: CommonTextFieldProps = { ...(params as any), ...TextFieldProps };
      if (color) _props.color = color as any;
      if (label) {
        _props.label = label;
        _props.InputLabelProps = {
          ...params?.InputLabelProps,
          ...TextFieldProps?.InputLabelProps,
        };
      }
      if (placeholder) _props.placeholder = placeholder;
      if (required) _props.required = true;
      if (error) _props.error = true;
      if (errorText) _props.errorText = errorText;
      if (loading)
        _props.InputProps = {
          ..._props?.InputProps,
          endAdornment: <CircularProgress color="inherit" size={20} />,
        };
      return (
        <CommonTextField
          {..._props}
          ref={params?.InputProps?.ref}
          value={params?.inputProps?.value}
          defaultValue={params?.inputProps?.defaultValue}
        />
      );
    },
    [loading, TextFieldProps, label, color, error, errorText, required, placeholder]
  );
  return (
    <AutocompleteStyled
      fullWidth
      size="small"
      {...(otherProps as any)}
      value={memoValue}
      ref={ref}
      color={color}
      multiple={multiple}
      filterOptions={memoFilterOptions as any}
      isOptionEqualToValue={isOptionEqualToValue as any}
      renderTags={memoRenderTags as any}
      getOptionLabel={memoGetOptionLabel as any}
      options={memoOptions}
      loading={loading}
      onInputChange={handleChangeTextDelay}
      renderOption={memoRenderOption as any}
      disableCloseOnSelect={disableCloseOnSelect}
      renderInput={memoRenderInput}
    />
  );
});
export default PlaceField;
