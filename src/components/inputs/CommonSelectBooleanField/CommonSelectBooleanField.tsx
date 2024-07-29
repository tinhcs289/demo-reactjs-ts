import CommonSelectField from '@/components/inputs/CommonSelectField';
import type { ComponentType } from 'react';
import { forwardRef } from 'react';
import withBooleanValue from './withBooleanValue';
import type { CommonSelectBooleanFieldProps } from './_types';

const CommonField: ComponentType<CommonSelectBooleanFieldProps> = withBooleanValue(CommonSelectField);

const CommonSelectBooleanField = forwardRef<unknown, CommonSelectBooleanFieldProps>((props, ref) => {
  return <CommonField {...props} inputRef={ref} />;
});
CommonSelectBooleanField.displayName = 'CommonSelectBooleanField';
export default CommonSelectBooleanField as ComponentType<CommonSelectBooleanFieldProps>;
