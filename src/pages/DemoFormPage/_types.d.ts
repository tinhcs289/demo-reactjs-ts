import type { TCheckGroupOption } from '@/components/rhfInputs/RHFCheckGroup';
import type { TRadioGroupOption } from '@/components/rhfInputs/RHFRadioGroup';
import type { TAutoCompleteOption } from '@/components/rhfInputs/RHFSelect';
import type { TSwitchGroupOption } from '@/components/rhfInputs/RHFSwitchGroup';
import type { TCommonTagInput } from '@/components/rhfInputs/RHFTagInput';
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
