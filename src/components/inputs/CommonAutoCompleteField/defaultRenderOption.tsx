import { AutocompleteRenderOptionState } from '@mui/material/Autocomplete';
import React from 'react';
import { TAutoCompleteOption } from './_types';

const defaultRenderOption = (
  props: React.HTMLAttributes<HTMLLIElement>,
  option: TAutoCompleteOption,
  state: AutocompleteRenderOptionState,
) => {
  return (
    <li {...props} key={option?.value}>
      {option?.label || ''}
    </li>
  );
};
export default defaultRenderOption;
