import type { AutocompleteRenderOptionState } from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import React from 'react';
import type { TAutoCompleteOption } from './_types';

const defaultRenderOption =
  (multiple: boolean) =>
  (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: TAutoCompleteOption,
    state: AutocompleteRenderOptionState
  ) => {
    return (
      <li {...props} key={`${option.value}`}>
        {multiple ? (
          <Checkbox style={{ marginRight: 8 }} checked={!!state?.selected} />
        ) : (
          <Radio style={{ marginRight: 8 }} checked={!!state?.selected} />
        )}

        {option?.label || ''}
      </li>
    );
  };
export default defaultRenderOption;
