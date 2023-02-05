import type { TAutoCompleteOption } from './_types';

export default function isOptionEqualToValue(
  option: TAutoCompleteOption,
  value: TAutoCompleteOption | string
) {
  return option?.value === (value as string) || option?.value === (value as TAutoCompleteOption)?.value;
}
