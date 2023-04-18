import NavLinkNoStyle from '@/components/nav/NavLinkNoStyle';
import { styled } from '@mui/material';
import type { ButtonProps } from '@mui/material/Button';
import Button from '@mui/material/Button';
export type ButtonCommonProps = ButtonProps & { noTextTransform?: boolean };
export const ButtonCommon = styled(Button, {
  shouldForwardProp: (p) => p !== 'noTextTransform',
})<ButtonCommonProps>(({ noTextTransform }) => ({
  ...(!!noTextTransform ? { textTransform: 'none' } : {}),
}));
export function ButtonSubmit(props: ButtonProps) {
  const { children, ...otherProps } = props;
  return (
    <ButtonCommon type="submit" color="primary" variant="contained" size="small" {...otherProps}>
      {children}
    </ButtonCommon>
  );
}
export function ButtonCancel(props: ButtonProps) {
  const { children, ...otherProps } = props;
  return (
    <ButtonCommon color="primary" size="small" {...otherProps}>
      {children}
    </ButtonCommon>
  );
}
export type ButtonLinkProps = ButtonCommonProps & { to: string };
export function ButtonLink(props: ButtonLinkProps) {
  const { children, to, ...otherProps } = props;
  return (
    <NavLinkNoStyle to={to || '#'}>
      <ButtonCommon color="primary" size="small" {...otherProps}>
        {children}
      </ButtonCommon>
    </NavLinkNoStyle>
  );
}
