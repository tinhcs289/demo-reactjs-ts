import { styled } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import type { BaseAutocompleteProps } from './_types';
const AutocompleteStyled = styled(Autocomplete)<BaseAutocompleteProps>(({ theme }) => ({
  '& div.MuiInputBase-root': {
    paddingRight: `${theme.spacing(0.5)} !important`,
  },
  '& input.MuiInputBase-input.MuiAutocomplete-input': {
    //padding: '0 !important',
  },
}));
export default AutocompleteStyled;
