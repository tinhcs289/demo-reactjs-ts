import { TextFieldProps } from '@mui/material/TextField';
import { ChipTypeMap } from '@mui/material/Chip';
import {
  AutocompleteProps,
  AutocompleteInputChangeReason,
  AutocompleteRenderOptionState,
} from '@mui/material/Autocomplete';
import React from 'react';

export type TAutoCompleteOption = {
  label?: string;
  value?: string | number;
  pinnedAsRecently?: boolean;
  [x: string]: any;
};

export type TAutocompleteQueryFailReason = 'not_found' | 'api_error' | 'invalid_params';
export type TCommonAutoCompleteFieldProps = Pick<TextFieldProps, 'label'> &
  Omit<
    AutocompleteProps<
      TAutoCompleteOption,
      boolean | undefined,
      boolean | undefined,
      boolean | undefined,
      ChipTypeMap['defaultComponent']
    >,
    'renderInput' | 'options'
  > & {
    options?: TAutoCompleteOption[];
    onQuery?: (text: string, reason?: AutocompleteInputChangeReason) => void;
    onQueryFail?: (text: string, reason?: TAutocompleteQueryFailReason) => void;
    TextFieldProps?: TextFieldProps;
    pinnedOptions?: TAutoCompleteOption[];
    renderPinnedOption?: (
      optionProps: React.HTMLAttributes<HTMLLIElement>,
      option: TAutoCompleteOption,
      state: AutocompleteRenderOptionState,
    ) => React.ReactNode;
  };
