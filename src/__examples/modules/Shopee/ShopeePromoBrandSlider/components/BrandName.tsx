import { styled } from '@mui/material';
import type { TypographyProps } from '@mui/material/Typography';
import Typography from '@mui/material/Typography';
const BrandName = styled(Typography)<TypographyProps>(({ theme }) => ({
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  width: '100%',
  whiteSpace: 'nowrap',
  lineheight: '1.2em',
  fontSize: '1.5em',
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.error.main,
}));
export default BrandName;
