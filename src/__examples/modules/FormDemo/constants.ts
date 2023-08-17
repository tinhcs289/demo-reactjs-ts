import { fieldArrayObject1 } from './fields/fieldArrayObject1';
import { fieldArrayObject2 } from './fields/fieldArrayObject2';
import { fieldCKEditor } from './fields/fieldCKEditor';
import { fieldCheck } from './fields/fieldCheck';
import { fieldCheckGroup } from './fields/fieldCheckGroup';
import { fieldDate } from './fields/fieldDate';
import { fieldDateMulti } from './fields/fieldDateMulti';
import { fieldDateTime } from './fields/fieldDateTime';
import { fieldFiles1 } from './fields/fieldFiles1';
import { fieldFiles2 } from './fields/fieldFiles2';
import { fieldGooglePlace } from './fields/fieldGooglePlace';
import { fieldGooglePlaceMulti } from './fields/fieldGooglePlaceMulti';
import { fieldNumber } from './fields/fieldNumber';
import { fieldNumberCurrency } from './fields/fieldNumberCurrency';
import { fieldNumberPercentage } from './fields/fieldNumberPercentage';
import { fieldRadio } from './fields/fieldRadio';
import { fieldRadioGroup } from './fields/fieldRadioGroup';
import { fieldSelect } from './fields/fieldSelect';
import { fieldSelectBoolean } from './fields/fieldSelectBoolean';
import { fieldSelectMulti } from './fields/fieldSelectMulti';
import { fieldSubForm } from './fields/fieldSubForm';
import { fieldSwitch } from './fields/fieldSwitch';
import { fieldSwitchGroup } from './fields/fieldSwitchGroup';
import { fieldText } from './fields/fieldText';
import { fieldTextTags } from './fields/fieldTextTag';
import { fieldTime } from './fields/fieldTime';
import { fieldToggle } from './fields/fieldToggle';
import { fieldToggleMulti } from './fields/fieldToggleMulti';
import type { FormValues } from './_types';
export const defaultValues: FormValues = {
  TextField: '',
  SelectField: undefined,
  SelectMultiField: undefined,
  RadioField: false,
  CheckField: true,
  SwitchField: false,
  SelectBooleanField: undefined,
  DateField: undefined,
  DateTimeField: undefined,
  TimeField: undefined,
  DateMultiField: undefined,
  DateMultiField2: undefined,
  CheckGroupField: undefined,
  RadioGroupField: undefined,
  SwithGroupField: undefined,
  TagInputField: undefined,
  NumberField: undefined,
};
export const fields = [
  fieldText,
  fieldNumber,
  fieldNumberCurrency,
  fieldNumberPercentage,
  fieldTextTags,
  fieldCKEditor,
  fieldSelect,
  fieldSelectMulti,
  fieldSelectBoolean,
  fieldGooglePlace,
  fieldGooglePlaceMulti,
  fieldSwitch,
  fieldSwitchGroup,
  fieldCheck,
  fieldCheckGroup,
  fieldRadio,
  fieldRadioGroup,
  fieldToggle,
  fieldToggleMulti,
  fieldDate,
  fieldDateTime,
  fieldTime,
  fieldDateMulti,
  fieldFiles1,
  fieldFiles2,
  fieldSubForm,
  fieldArrayObject1,
  fieldArrayObject2,
];
