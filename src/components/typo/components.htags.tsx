import type { CommonTypographyProps } from './components.base';
import { CommonTypography } from './components.base';
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
