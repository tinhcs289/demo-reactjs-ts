import CommonDateMultiPickerField from '@/components/inputs/CommonDateMultiPickerField';
import withSelectedDateTags from '@/components/inputs/CommonDateMultiPickerField/hocs/withSelectedDateTags';
import type { FC } from 'react';
import type { ICommonDateMultiPickerWithTagsFieldProps } from './_types';

const CommonDateMultiPickerWithTagsField: FC<ICommonDateMultiPickerWithTagsFieldProps> =
  withSelectedDateTags(CommonDateMultiPickerField);
export default CommonDateMultiPickerWithTagsField;
