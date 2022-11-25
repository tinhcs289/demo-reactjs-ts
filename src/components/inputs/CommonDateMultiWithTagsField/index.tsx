import CommonDateMultiField from '@/components/inputs/CommonDateMultiField';
import withSelectedDateTags from '@/components/inputs/CommonDateMultiField/hocs/withSelectedDateTags';
import type { FC } from 'react';
import type { ICommonDateMultiWithTagsFieldProps } from './_types';

const CommonDateMultiWithTagsField: FC<ICommonDateMultiWithTagsFieldProps> = withSelectedDateTags(CommonDateMultiField);
export default CommonDateMultiWithTagsField;
