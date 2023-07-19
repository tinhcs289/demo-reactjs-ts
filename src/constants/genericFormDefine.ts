import type { RHFCKEditorProps } from '@/components/rhfInputs/RHFCKEditor';
import RHFCKEditor from '@/components/rhfInputs/RHFCKEditor';
import type { RHFCheckProps } from '@/components/rhfInputs/RHFCheck';
import RHFCheck from '@/components/rhfInputs/RHFCheck';
import type { RHFCheckGroupProps } from '@/components/rhfInputs/RHFCheckGroup';
import RHFCheckGroup from '@/components/rhfInputs/RHFCheckGroup';
import type { RHFDateProps } from '@/components/rhfInputs/RHFDate';
import RHFDate from '@/components/rhfInputs/RHFDate';
import type { RHFDateMultiProps } from '@/components/rhfInputs/RHFDateMulti';
import RHFDateMulti from '@/components/rhfInputs/RHFDateMulti';
import type { RHFDateStaticProps } from '@/components/rhfInputs/RHFDateStatic';
import RHFDateStatic from '@/components/rhfInputs/RHFDateStatic';
import type { RHFDateTimeProps } from '@/components/rhfInputs/RHFDateTime';
import RHFDateTime from '@/components/rhfInputs/RHFDateTime';
import type { RHFDateTimeStaticProps } from '@/components/rhfInputs/RHFDateTimeStatic';
import RHFDateTimeStatic from '@/components/rhfInputs/RHFDateTimeStatic';
import type { RHFGooglePlaceProps } from '@/components/rhfInputs/RHFGooglePlace';
import RHFGooglePlace from '@/components/rhfInputs/RHFGooglePlace';
import type { RHFHiddenProps } from '@/components/rhfInputs/RHFHidden';
import RHFHidden from '@/components/rhfInputs/RHFHidden';
import type { RHFKeyboardDateProps } from '@/components/rhfInputs/RHFKeyboardDate';
import RHFKeyboardDate from '@/components/rhfInputs/RHFKeyboardDate';
import type { RHFNumberProps } from '@/components/rhfInputs/RHFNumber';
import RHFNumber from '@/components/rhfInputs/RHFNumber';
import type { RHFRadioProps } from '@/components/rhfInputs/RHFRadio';
import RHFRadio from '@/components/rhfInputs/RHFRadio';
import type { RHFRadioGroupProps } from '@/components/rhfInputs/RHFRadioGroup';
import RHFRadioGroup from '@/components/rhfInputs/RHFRadioGroup';
import type { RHFSelectProps } from '@/components/rhfInputs/RHFSelect';
import RHFSelect from '@/components/rhfInputs/RHFSelect';
import type { RHFSelectBooleanProps } from '@/components/rhfInputs/RHFSelectBoolean';
import RHFSelectBoolean from '@/components/rhfInputs/RHFSelectBoolean';
import type { RHFSwitchProps } from '@/components/rhfInputs/RHFSwitch';
import RHFSwitch from '@/components/rhfInputs/RHFSwitch';
import type { RHFSwitchGroupProps } from '@/components/rhfInputs/RHFSwitchGroup';
import RHFSwitchGroup from '@/components/rhfInputs/RHFSwitchGroup';
import type { RHFTagInputProps } from '@/components/rhfInputs/RHFTagInput';
import RHFTagInput from '@/components/rhfInputs/RHFTagInput';
import type { RHFTextProps } from '@/components/rhfInputs/RHFText';
import RHFText from '@/components/rhfInputs/RHFText';
import type { RHFTextNumericProps } from '@/components/rhfInputs/RHFTextNumeric';
import RHFTextNumeric from '@/components/rhfInputs/RHFTextNumeric';
import type { RHFTimeProps } from '@/components/rhfInputs/RHFTime';
import RHFTime from '@/components/rhfInputs/RHFTime';
import type { RHFTimeStaticProps } from '@/components/rhfInputs/RHFTimeStatic';
import RHFTimeStatic from '@/components/rhfInputs/RHFTimeStatic';
import type { RHFToggleProps } from '@/components/rhfInputs/RHFToggle';
import RHFToggle from '@/components/rhfInputs/RHFToggle';
import type { ComponentProps } from 'react';
//#region Types of input
export enum FieldType {
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
  'text-tags' = 'text-tags',
  'number' = 'number',
  'numeric' = 'numeric',
  'date-keyboard' = 'date-keyboard',
  'google-place' = 'google-place',
  'google-places' = 'google-places',
  'toggle' = 'toggle',
  'ckeditor' = 'ckeditor',
  'date-static' = 'date-static',
  'time-static' = 'time-static',
  'datetime-static' = 'datetime-static',
}
export type FormInputType = `${FieldType}`;
//#endregion
//#region Dictionaries of Component
export const DICT = {
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
  'text-tags': RHFTagInput,
  number: RHFNumber,
  numeric: RHFTextNumeric,
  hidden: RHFHidden,
  'date-keyboard': RHFKeyboardDate,
  'google-place': RHFGooglePlace,
  'google-places': RHFGooglePlace,
  toggle: RHFToggle,
  ckeditor: RHFCKEditor,
  'date-static': RHFDateStatic,
  'time-static': RHFTimeStatic,
  'datetime-static': RHFDateTimeStatic,
};
//#endregion
//#region RHF Component Props
export type RHFComponentProps<T extends FormInputType> = T extends 'text'
  ? RHFTextProps
  : T extends 'check'
  ? RHFCheckProps
  : T extends 'check-group'
  ? RHFCheckGroupProps
  : T extends 'radio'
  ? RHFRadioProps
  : T extends 'radio-group'
  ? RHFRadioGroupProps
  : T extends 'select'
  ? RHFSelectProps
  : T extends 'switch'
  ? RHFSwitchProps
  : T extends 'switch-group'
  ? RHFSwitchGroupProps
  : T extends 'select-multi'
  ? RHFSelectProps
  : T extends 'select-boolean'
  ? RHFSelectBooleanProps
  : T extends 'date'
  ? RHFDateProps
  : T extends 'date-keyboard'
  ? RHFKeyboardDateProps
  : T extends 'date-time'
  ? RHFDateTimeProps
  : T extends 'time'
  ? RHFTimeProps
  : T extends 'date-multi'
  ? RHFDateMultiProps
  : T extends 'text-tags'
  ? RHFTagInputProps
  : T extends 'number'
  ? RHFNumberProps
  : T extends 'numeric'
  ? RHFTextNumericProps
  : T extends 'hidden'
  ? RHFHiddenProps
  : T extends 'google-place'
  ? RHFGooglePlaceProps
  : T extends 'google-places'
  ? RHFGooglePlaceProps
  : T extends 'toggle'
  ? RHFToggleProps
  : T extends 'ckeditor'
  ? RHFCKEditorProps
  : T extends 'date-static'
  ? RHFDateStaticProps
  : T extends 'time-static'
  ? RHFTimeStaticProps
  : T extends 'datetime-static'
  ? RHFDateTimeStaticProps
  : ComponentProps<any>;
//#endregion
