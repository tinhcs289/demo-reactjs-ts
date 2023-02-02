import CommonSelectField from '@/components/inputs/CommonSelectField';
import type { ComponentType } from 'react';
import { forwardRef } from 'react';
import withBooleanValue from './withBooleanValue';
import type { TCommonSelectBooleanFieldProps } from './_types';

const CommonField: ComponentType<TCommonSelectBooleanFieldProps> = withBooleanValue(CommonSelectField);

const CommonSelectBooleanField: ComponentType<TCommonSelectBooleanFieldProps> = forwardRef((props, ref) => {
  return <CommonField {...props} inputRef={ref} />;
});
export default CommonSelectBooleanField;
