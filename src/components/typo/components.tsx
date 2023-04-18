import { styled } from '@mui/material';
import type { TypographyProps } from '@mui/material/Typography';
import Typography from '@mui/material/Typography';
export type CommonTypographyProps<D extends React.ElementType<any> = 'span'> = TypographyProps<D> & {
  maxLines?: number;
  lineHeight?: number;
};
export const CommonTypography = styled(Typography, {
  shouldForwardProp: (p) => p !== 'maxLines' && p !== 'lineHeight',
})<CommonTypographyProps>(({ maxLines, lineHeight }) => ({
  ...(!!maxLines && Number.isInteger(maxLines) && maxLines > 0
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
}));
export type HTagProps<D extends React.ElementType<any> = 'span'> = Omit<CommonTypographyProps<D>, 'variant'>;
export function H1(props: HTagProps<'h1'>) {
  const { children, ...otherProps } = props;
  return (
    <CommonTypography {...otherProps} variant="h1">
      {children}
    </CommonTypography>
  );
}
export function H2(props: HTagProps<'h2'>) {
  const { children, ...otherProps } = props;
  return (
    <CommonTypography {...otherProps} variant="h2">
      {children}
    </CommonTypography>
  );
}
export function H3(props: HTagProps<'h3'>) {
  const { children, ...otherProps } = props;
  return (
    <CommonTypography {...otherProps} variant="h3">
      {children}
    </CommonTypography>
  );
}
export function H4(props: HTagProps<'h4'>) {
  const { children, ...otherProps } = props;
  return (
    <CommonTypography {...otherProps} variant="h4">
      {children}
    </CommonTypography>
  );
}
export function H5(props: HTagProps<'h5'>) {
  const { children, ...otherProps } = props;
  return (
    <CommonTypography {...otherProps} variant="h5">
      {children}
    </CommonTypography>
  );
}
export function H6(props: HTagProps<'h6'>) {
  const { children, ...otherProps } = props;
  return (
    <CommonTypography {...otherProps} variant="h6">
      {children}
    </CommonTypography>
  );
}
