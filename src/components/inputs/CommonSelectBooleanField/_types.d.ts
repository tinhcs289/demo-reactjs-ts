import type { TCommonSelectFieldProps } from '@/components/inputs/CommonSelectField';
import type { AutocompleteChangeDetails, AutocompleteChangeReason } from '@mui/material/Autocomplete';
import type { Ref } from 'react';

export type TCommonSelectBooleanFieldOnChange = (
  event: React.SyntheticEvent<Element, Event>,
  value: boolean | null | undefined,
  reason: AutocompleteChangeReason,
  details: AutocompleteChangeDetails<TAutoCompleteOption> | undefined
) => void;

export type TCommonSelectBooleanFieldProps = Omit<
  TCommonSelectFieldProps,
  'value' | 'defaultValue' | 'onChange' | 'multiple' | 'options'
> & {
  onChange?: TCommonSelectBooleanFieldOnChange;
  value?: boolean;
  defaultValue?: boolean;
  labelTrue?: string;
  labelFalse?: string;
  inputRef?: Ref<unknown>;
};
