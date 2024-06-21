import type { AutoCompleteOption } from '@/components/inputs/CommonSelectField';
import type { CommonTextFieldProps } from '@/components/inputs/CommonTextField';
import type {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteInputChangeReason,
  AutocompleteOwnerState,
  AutocompleteProps,
  AutocompleteRenderGetTagProps,
  AutocompleteRenderOptionState,
} from '@mui/material/Autocomplete';
import type { ChipTypeMap } from '@mui/material/Chip';
import type { AxiosResponse } from 'axios';
import type { HTMLAttributes, ReactNode, SyntheticEvent } from 'react';
export type GooglePlaceOption = AutoCompleteOption & {
  placeId?: string;
  placeName?: string;
  placeData?: google.maps.places.AutocompletePrediction;
  placeGeocode?: google.maps.GeocoderResult;
  lat?: number;
  lng?: number;
  [x: string]: any;
};
export type BaseAutocompleteProps = AutocompleteProps<
  GooglePlaceOption,
  boolean | undefined,
  boolean | undefined,
  boolean | undefined,
  ChipTypeMap['defaultComponent']
>;
export type PlaceQueryFailReason = 'not_found' | 'api_error' | 'invalid_params';
export type RequestError = {
  response?: AxiosResponse<any>;
  reason?: PlaceQueryFailReason;
  [x: string]: any;
};
export type GooglePlaceFieldProps = Pick<
  CommonTextFieldProps,
  'label' | 'error' | 'required' | 'errorText' | 'placeholder'
> &
  Omit<BaseAutocompleteProps, 'renderInput' | 'options'> & {
    options?: GooglePlaceOption[];
    TextFieldProps?: Partial<CommonTextFieldProps>;
    onQueryFail?: (text: string, reason?: PlaceQueryFailReason) => void;
  };
export type OnSelectPlaceHandler = (
  event: SyntheticEvent<Element, Event>,
  value: NonNullable<string | GooglePlaceOption> | (string | GooglePlaceOption)[] | null,
  reason: AutocompleteChangeReason,
  details: AutocompleteChangeDetails<GooglePlaceOption> | undefined
) => void;
export type OnInputChangeHandler = (
  event: SyntheticEvent<Element, Event>,
  text: string,
  reason: AutocompleteInputChangeReason
) => void;
export type SelectedPlaceTagsRender = (
  value: GooglePlaceOption[],
  getTagProps: AutocompleteRenderGetTagProps,
  ownerState: AutocompleteOwnerState<GooglePlaceOption, boolean, boolean, boolean, 'div'>
) => ReactNode;
export type RenderPlaceOptionFunction = (
  props: HTMLAttributes<HTMLLIElement>,
  option: GooglePlaceOption,
  state: AutocompleteRenderOptionState
) => ReactNode;
