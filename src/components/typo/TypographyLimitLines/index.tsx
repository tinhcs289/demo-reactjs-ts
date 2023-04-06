import { styled } from '@mui/material';
import type { TypographyProps } from '@mui/material/Typography';
import Typography from '@mui/material/Typography';
const TypographyLimitLines = styled(Typography, {
  shouldForwardProp: (p) => p !== 'maxLines' && p !== 'lineHeight',
})<TypographyProps & { maxLines: number; lineHeight?: number }>(({ maxLines, lineHeight }) => ({
  lineHeight: `${lineHeight || 1.334}em`,
  height: `${(lineHeight || 1.334) * maxLines}em`,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '100%',
  display: '-webkit-box',
  WebkitLineClamp: maxLines,
  WebkitBoxOrient: 'vertical',
}));
export default TypographyLimitLines;
