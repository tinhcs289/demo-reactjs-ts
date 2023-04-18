import MicIcon from '@mui/icons-material/Mic';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
export default function SearchBox() {
  return (
    <TextField
      size="small"
      placeholder="Hàng hiệu Freeship 70K!"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <MicIcon />
          </InputAdornment>
        ),
      }}
      fullWidth
      sx={{
        borderRadius: (t) => t?.spacing?.(0.5),
        background: (t) => t?.palette?.background?.paper,
        '& .MuiInputBase-root': {
          pl: (t) => t?.spacing?.(1),
          pr: (t) => t?.spacing?.(1),
        },
      }}
      margin="none"
    />
  );
}
