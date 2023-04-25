import type { GooglePlaceFieldProps } from '@/components/inputs/CommonGooglePlaceField';
import type { RHFInputProps } from '@/components/rhfInputs';
export type RHFGooglePlaceProps = {
  id?: `${string}:google-place:${string}`;
} & RHFInputProps &
  Omit<GooglePlaceFieldProps, 'name'>;
export type { GooglePlaceOption } from '@/components/inputs/CommonGooglePlaceField';
