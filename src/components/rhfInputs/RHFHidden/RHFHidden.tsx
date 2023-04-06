import { Controller } from 'react-hook-form';
import type { RHFHiddenProps } from './_types';
export default function RHFHidden(props: RHFHiddenProps) {
  const { name, control, shouldUnregister } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <input {...field} type="hidden" />}
      {...(typeof shouldUnregister === 'boolean' ? { shouldUnregister } : {})}
    />
  );
}
