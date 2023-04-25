import type { AutoCompleteOption } from './_types';
export default function isOptionEqualToValue(
  option: AutoCompleteOption,
  value: AutoCompleteOption | string
) {
  return option?.value === (value as string) || option?.value === (value as AutoCompleteOption)?.value;
}
