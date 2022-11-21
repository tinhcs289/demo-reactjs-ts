import type { AutocompleteProps } from '@mui/material/Autocomplete';
import type { ChipTypeMap } from '@mui/material/Chip';
import type { TextFieldProps } from '@mui/material/TextField';

export type TAutoCompleteOption = {
  label: string;
  value: string;
  disabled?: boolean;
  [x: string]: any;
};

export type TCommonSelectFieldProps = Pick<TextFieldProps, 'label' | 'error' | 'required' | 'helperText'> &
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
    TextFieldProps?: TextFieldProps;
  };
