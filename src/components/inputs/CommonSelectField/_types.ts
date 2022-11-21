import type { AutocompleteProps } from '@mui/material/Autocomplete';
import type { ChipTypeMap } from '@mui/material/Chip';
import type { TCommonTextFieldProps } from '@/components/inputs/CommonTextField/_types';

export type TAutoCompleteOption = {
  label: string;
  value: string;
  disabled?: boolean;
  [x: string]: any;
};

export type TCommonSelectFieldProps = Pick<TCommonTextFieldProps, 'label' | 'error' | 'required' | 'errorText'> &
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
    TextFieldProps?: TCommonTextFieldProps;
  };
