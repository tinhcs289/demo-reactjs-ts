import { styled } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import type { BaseAutocompleteProps } from './_types';
import type { Theme } from '@mui/material';
function labelStyledFix(_theme: Theme) {
  return {
    '& .MuiFormLabel-root': {
      '&.MuiInputLabel-filled': {
        transform: 'translate(8px, 0px) scale(0.75)',
      },
      '&.MuiInputLabel-outlined': {
        transform: 'translate(14px, -9px) scale(0.75)',
      },
      '&.MuiInputLabel-standard': {
        transform: 'translate(0px, -2px) scale(0.75)',
      },
    },
    '& .MuiOutlinedInput-root legend': {
      maxWidth: `100%`,
    },
    '& .MuiFilledInput-root legend': {
      maxWidth: `100%`,
    },
    '& .MuiStandardInput-root legend': {
      maxWidth: `100%`,
    },
  };
}
const AutocompleteStyled = styled(Autocomplete)<BaseAutocompleteProps>(({ theme }) => ({
  '& div.MuiInputBase-root': {
    paddingRight: `${theme.spacing(0.5)} !important`,
  },
  '&.Mui-focused': {
    ...labelStyledFix(theme),
  },
  '&.MuiAutocomplete-hasClearIcon': {
    ...labelStyledFix(theme),
  },
}));
export default AutocompleteStyled;
