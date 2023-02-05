import type { TCheckGroupOption } from '@/components/inputs/CommonCheckGroupField/_types';
import type { TRadioGroupOption } from '@/components/inputs/CommonRadioGroupField/_types';
import type { TAutoCompleteOption } from '@/components/inputs/CommonSelectField/_types';
import consecutiveNumbers from '@/helpers/arrayHelpers/consecutiveNumbers';
import type { TFormData } from './_types';

export const LABEL = 'Lorem ipsum dolor sit amet';

export const optionsCheck: TCheckGroupOption[] = consecutiveNumbers(5, 1).map((i) => ({
  label: `${LABEL} ${i}`,
  value: `${i}`,
}));

export const optionRadio: TRadioGroupOption[] = consecutiveNumbers(5, 1).map((i) => ({
  label: `${LABEL} ${i}`,
  value: `${i}`,
}));

export const options: TAutoCompleteOption[] = consecutiveNumbers(20, 1).map((i) => ({
  label: `lựa chọn ${i}`,
  value: `${i}`,
}));

export const defaultValues: TFormData = {
  TextField: '',
  SelectField: undefined,
  SelectMultiField: undefined,
  RadioField: false,
  CheckField: false,
  SwitchField: false,
  SelectBooleanField: false,
  DateField: undefined,
  DateTimeField: undefined,
  DateMultiField: undefined,
  CheckGroupField: undefined,
  RadioGroupField: undefined,
};
