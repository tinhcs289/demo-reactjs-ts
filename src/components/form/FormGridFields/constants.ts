import RHFCheck from '@/components/rhfInputs/RHFCheck';
import RHFCheckGroup from '@/components/rhfInputs/RHFCheckGroup';
import RHFDate from '@/components/rhfInputs/RHFDate';
import RHFDateMulti from '@/components/rhfInputs/RHFDateMulti';
import RHFDateMultiPicker from '@/components/rhfInputs/RHFDateMultiPicker';
import RHFDateMultiPickerWithTags from '@/components/rhfInputs/RHFDateMultiPickerWithTags';
import RHFDateTime from '@/components/rhfInputs/RHFDateTime';
import RHFHidden from '@/components/rhfInputs/RHFHidden';
import RHFNumber from '@/components/rhfInputs/RHFNumber';
import RHFRadio from '@/components/rhfInputs/RHFRadio';
import RHFRadioGroup from '@/components/rhfInputs/RHFRadioGroup';
import RHFSelect from '@/components/rhfInputs/RHFSelect';
import RHFSelectBoolean from '@/components/rhfInputs/RHFSelectBoolean';
import RHFSwitch from '@/components/rhfInputs/RHFSwitch';
import RHFSwitchGroup from '@/components/rhfInputs/RHFSwitchGroup';
import RHFTagInput from '@/components/rhfInputs/RHFTagInput';
import RHFText from '@/components/rhfInputs/RHFText';
import RHFTextNumeric from '@/components/rhfInputs/RHFTextNumeric';
import RHFTime from '@/components/rhfInputs/RHFTime';

export enum EFormInputType {
  'hidden' = 'hidden',
  'text' = 'text',
  'check' = 'check',
  'check-group' = 'check-group',
  'radio' = 'radio',
  'radio-group' = 'radio-group',
  'select' = 'select',
  'switch' = 'switch',
  'switch-group' = 'switch-group',
  'select-multi' = 'select-multi',
  'select-boolean' = 'select-boolean',
  'date' = 'date',
  'date-time' = 'date-time',
  'time' = 'time',
  'date-multi' = 'date-multi',
  'date-multi-picker' = 'date-multi-picker',
  'date-multi-picker-tags' = 'date-multi-picker-tags',
  'text-tags' = 'text-tags',
  'number' = 'number',
  'numeric' = 'numeric',
}
export const COMPONENT_DICT = {
  text: RHFText,
  check: RHFCheck,
  'check-group': RHFCheckGroup,
  radio: RHFRadio,
  'radio-group': RHFRadioGroup,
  select: RHFSelect,
  switch: RHFSwitch,
  'switch-group': RHFSwitchGroup,
  'select-multi': RHFSelect,
  'select-boolean': RHFSelectBoolean,
  date: RHFDate,
  'date-time': RHFDateTime,
  time: RHFTime,
  'date-multi': RHFDateMulti,
  'date-multi-picker': RHFDateMultiPicker,
  'date-multi-picker-tags': RHFDateMultiPickerWithTags,
  'text-tags': RHFTagInput,
  number: RHFNumber,
  numeric: RHFTextNumeric,
  hidden: RHFHidden,
};
