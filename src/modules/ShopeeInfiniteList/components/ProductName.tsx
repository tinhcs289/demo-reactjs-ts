import { styled } from '@mui/material';
import type { TypographyProps } from '@mui/material/Typography';
import Typography from '@mui/material/Typography';

const ProductName = styled(Typography)<TypographyProps>(({ theme }) => ({
  lineHeight: `${1.334}em`,
  height: `${1.334 * 2}em`,
  fontWeight: 500,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '100%',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
}));
export default ProductName;
