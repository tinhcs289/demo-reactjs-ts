import { TAutoCompleteOption } from '@/components/inputs/CommonSelectField/_types';
import type { TSwitchGroupOption } from '@/components/inputs/CommonSwitchGroupField/_types';
import newGuid from '@/helpers/stringHelpers/newGuid';

export const MALE: TAutoCompleteOption = { label: 'Nam', value: `1` };
export const FEMALE: TAutoCompleteOption = { label: 'Nữ', value: `2` };
export const LGBT: TAutoCompleteOption = { label: 'LGBT', value: `3` };

export const checkboxesOptions: TSwitchGroupOption[] = [
  { label: 'Lựa chọn 1', value: newGuid() },
  { label: 'Lựa chọn 2', value: newGuid() },
  { label: 'Lựa chọn 3', value: newGuid() },
  { label: 'Lựa chọn 4', value: newGuid() },
  { label: 'Lựa chọn 5', value: newGuid() },
  { label: 'Lựa chọn 6', value: newGuid() },
];
