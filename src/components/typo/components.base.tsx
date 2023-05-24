import { styled } from '@mui/material';
import type { TypographyProps } from '@mui/material/Typography';
import Typography from '@mui/material/Typography';
import type { ElementType } from 'react';
export type CommonTypographyProps<D extends ElementType<any> = 'span'> = TypographyProps<D> & {
  maxLines?: number;
  lineHeight?: number;
  breakSpaces?: boolean;
};
export const CommonTypography = styled(Typography, {
  shouldForwardProp: (p) => p !== 'maxLines' && p !== 'lineHeight' && p !== 'breakSpaces',
})<CommonTypographyProps>(({ maxLines, lineHeight, breakSpaces }) => ({
  ...(maxLines === 1
    ? {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }
    : {}),
  ...(!!maxLines && Number.isInteger(maxLines) && maxLines > 1
    ? {
        lineHeight: `${lineHeight || 1.334}em`,
        height: `${(lineHeight || 1.334) * maxLines}em`,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '100%',
        display: '-webkit-box',
        WebkitLineClamp: maxLines,
        WebkitBoxOrient: 'vertical',
      }
    : {}),
  ...(!!breakSpaces ? { whiteSpace: 'break-spaces' } : {}),
}));
