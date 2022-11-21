import type { TRHFHiddenProps } from './_types';
import React from 'react';
import { Controller } from 'react-hook-form';

const RHFHidden: React.FC<TRHFHiddenProps> = (props) => {
  const { name, control, shouldUnregister } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, formState, fieldState }) => <input {...field} type="hidden" />}
      {...(typeof shouldUnregister === 'boolean' ? { shouldUnregister } : {})}
    />
  );
};
export default RHFHidden;
