import type { TCheckGroupOption } from '@/components/inputs/CommonCheckGroupField/_types';
import type { TRadioGroupOption } from '@/components/inputs/CommonRadioGroupField/_types';
import type { TAutoCompleteOption } from '@/components/inputs/CommonSelectField/_types';
import type { TSwitchGroupOption } from '@/components/inputs/CommonSwitchGroupField/_types';
import type { TCommonTagInput } from '@/components/inputs/CommonTagInputField/_types';
import type { Moment } from 'moment';

export type TFormData = {
  TextField?: string;
  SelectField?: TAutoCompleteOption;
  SelectMultiField?: TAutoCompleteOption[];
  RadioField?: boolean;
  CheckField?: boolean;
  SwitchField?: boolean;
  SelectBooleanField?: boolean;
  DateField?: Moment;
  DateTimeField?: Moment;
  TimeField?: Moment;
  DateMultiField?: Moment[];
  DateMultiField2?: Moment[];
  DateMultiField3?: Moment[];
  CheckGroupField?: TCheckGroupOption[];
  RadioGroupField?: TRadioGroupOption[];
  SwithGroupField?: TSwitchGroupOption[];
  TagInputField?: TCommonTagInput[];
  NumberField?: number;
};
