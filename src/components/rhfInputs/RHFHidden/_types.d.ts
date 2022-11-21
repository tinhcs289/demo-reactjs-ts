import type { Control } from 'react-hook-form';

export type TRHFHiddenProps = {
  name: string;
  control: Control<any, any>;
  shouldUnregister?: boolean;
};
