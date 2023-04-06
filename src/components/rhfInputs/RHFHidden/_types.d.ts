import type { Control } from 'react-hook-form';
export type RHFHiddenProps = {
  name: string;
  control: Control<any, any>;
  shouldUnregister?: boolean;
  id?: `${string}:hidden:${string}`;
};
