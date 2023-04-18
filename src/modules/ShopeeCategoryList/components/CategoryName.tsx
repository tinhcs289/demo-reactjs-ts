import { styled } from '@mui/material';
import type { TypographyProps } from '@mui/material/Typography';
import Typography from '@mui/material/Typography';
const CategoryName = styled(Typography)<TypographyProps>({
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  width: '100%',
  lineheight: '1.2em',
  fontSize: '1em',
});
export default CategoryName;
