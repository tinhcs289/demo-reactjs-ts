import type { TCommonTextFieldProps } from '@/components/inputs/CommonTextField';
import type {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteProps,
  AutocompleteRenderGetTagProps,
  AutocompleteOwnerState,
} from '@mui/material/Autocomplete';
import type { ChipTypeMap } from '@mui/material/Chip';
import type { ReactNode } from 'react';

export type TAutoCompleteOption = {
  label: string;
  value: string;
  disabled?: boolean;
  [x: string]: any;
};

export type BaseAutocompleteProps = AutocompleteProps<
  TAutoCompleteOption,
  boolean | undefined,
  boolean | undefined,
  boolean | undefined,
  ChipTypeMap['defaultComponent']
>;

export type TCommonSelectFieldProps = Pick<
  TCommonTextFieldProps,
  'label' | 'error' | 'required' | 'errorText'
> &
  Omit<BaseAutocompleteProps, 'renderInput' | 'options'> & {
    options?: TAutoCompleteOption[];
    TextFieldProps?: Partial<TCommonTextFieldProps>;
  };

export type TCommonSelectFieldOnChange = (
  event: React.SyntheticEvent<Element, Event>,
  value: NonNullable<string | TAutoCompleteOption> | (string | TAutoCompleteOption)[] | null,
  reason: AutocompleteChangeReason,
  details: AutocompleteChangeDetails<TAutoCompleteOption> | undefined
) => void;

export type TCommonSelectRenderTags = (
  value: TAutoCompleteOption[],
  getTagProps: AutocompleteRenderGetTagProps,
  ownerState: AutocompleteOwnerState<TAutoCompleteOption, boolean, boolean, boolean, 'div'>
) => ReactNode;
