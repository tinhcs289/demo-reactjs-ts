import isValidAsYupSchema from '@/helpers/commonHelpers/isValidAsYupSchema';
import type { AutocompleteRenderOptionState } from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import type { HTMLAttributes } from 'react';
import * as yup from 'yup';
import type { GooglePlaceOption } from './_types';
export function defaultFilterOptions(options: GooglePlaceOption[], state: any) {
  return options;
}
export function defaultRenderOption(multiple: boolean) {
  return function renderOption(
    props: HTMLAttributes<HTMLLIElement>,
    option: GooglePlaceOption,
    state: AutocompleteRenderOptionState
  ) {
    return (
      <li {...props} key={`${option.value}`}>
        {multiple ? (
          <Checkbox style={{ marginRight: 8 }} checked={!!state?.selected} />
        ) : (
          <Radio style={{ marginRight: 8 }} checked={!!state?.selected} />
        )}
        {option?.label || ''}
      </li>
    );
  };
}
export function defaultGetOptionLabel(option: string | GooglePlaceOption) {
  return typeof option === 'string' ? option : option?.label || '';
}
export function isOptionEqualToValue(option: GooglePlaceOption, value: GooglePlaceOption | string) {
  if (typeof value === 'string') return false;
  if (isValidPlace(option) && isValidPlace(value) && option?.value === value?.value) return true;
  return false;
}
export function isValidPlace(place?: GooglePlaceOption) {
  if (!place) return false;
  return isValidAsYupSchema(
    place,
    yup.object().shape({
      value: yup.string().required(),
      label: yup.string().required(),
      placeId: yup.string().required(),
      placeName: yup.string().required(),
    }) as any
  );
}
export function toOption(option: google.maps.places.AutocompletePrediction): GooglePlaceOption {
  return {
    value: option.place_id,
    label: option.description,
    placeId: option.place_id,
    placeName: option.description,
    placeData: option,
  } as GooglePlaceOption;
}
