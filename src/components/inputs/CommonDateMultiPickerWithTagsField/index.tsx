import type { ICommonDateMultiPickerFieldProps } from '@/components/inputs/CommonDateMultiPickerField';
import CommonDateMultiPickerField, {
  withSelectedDateTags,
} from '@/components/inputs/CommonDateMultiPickerField';
import type { ComponentType } from 'react';

export type ICommonDateMultiPickerWithTagsFieldProps = ICommonDateMultiPickerFieldProps;

const CommonDateMultiPickerWithTagsField: ComponentType<ICommonDateMultiPickerWithTagsFieldProps> =
  withSelectedDateTags(CommonDateMultiPickerField);
export default CommonDateMultiPickerWithTagsField;
