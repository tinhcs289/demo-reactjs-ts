import type { TAutoCompleteOption } from './_types';

export default function defaultGetOptionLabel(option: string | TAutoCompleteOption) {
  return typeof option === 'string' ? option : option?.label || '';
}
