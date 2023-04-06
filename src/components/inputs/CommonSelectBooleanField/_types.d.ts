import type { CommonSelectFieldProps } from '@/components/inputs/CommonSelectField';
import type { AutocompleteChangeDetails, AutocompleteChangeReason } from '@mui/material/Autocomplete';
import type { Ref, SyntheticEvent } from 'react';

export type CommonSelectBooleanFieldOnChange = (
  event: SyntheticEvent<Element, Event>,
  value: boolean | null | undefined,
  reason: AutocompleteChangeReason,
  details: AutocompleteChangeDetails<AutoCompleteOption> | undefined
) => void;

export type CommonSelectBooleanFieldProps = Omit<
  CommonSelectFieldProps,
  'value' | 'defaultValue' | 'onChange' | 'multiple' | 'options'
> & {
  onChange?: CommonSelectBooleanFieldOnChange;
  value?: boolean;
  defaultValue?: boolean;
  labelTrue?: string;
  labelFalse?: string;
  inputRef?: Ref<unknown>;
};
