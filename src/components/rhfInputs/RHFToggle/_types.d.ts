import type {
  CommonToggledFieldProps,
  ToggledOption,
  ToggledOptionValue,
} from '@/components/inputs/CommonToggledField';
import type { RHFInputProps } from '@/components/rhfInputs';
export type RHFToggleProps = CommonToggledFieldProps &
  RHFInputProps & {
    id?: `${string}:toggle:${string}`;
  };
export type { ToggledOption, ToggledOptionValue };
