import type { AutoCompleteOption } from './_types';
export default function defaultGetOptionLabel(option: string | AutoCompleteOption) {
  return typeof option === 'string' ? option : option?.label || '';
}
