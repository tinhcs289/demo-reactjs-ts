import { InputHelperTextWithIcon } from '@/components/formGroup';
import NavLinkNoStyle from '@/components/nav/NavLinkNoStyle';
import type { MuiIconProps } from '@/types';
import ErrorIcon from '@mui/icons-material/Error';
import { styled } from '@mui/material';
import type { BadgeProps } from '@mui/material/Badge';
import Badge from '@mui/material/Badge';
import type { ButtonProps } from '@mui/material/Button';
import Button from '@mui/material/Button';
import type { ComponentType, ReactNode } from 'react';
import { useMemo } from 'react';
export type ButtonCommonProps = ButtonProps & { noTextTransform?: boolean };
export const ButtonCommon = styled(Button, {
  shouldForwardProp: (p) => p !== 'noTextTransform',
})<ButtonCommonProps>(({ noTextTransform }) => ({
  ...(!!noTextTransform ? { textTransform: 'none' } : {}),
}));
export function ButtonPositive(props: ButtonCommonProps) {
  const { children, ...otherProps } = props;
  return (
    <ButtonCommon {...otherProps} color="primary" variant="contained" size="small">
      {children}
    </ButtonCommon>
  );
}
export function ButtonNegative(props: ButtonCommonProps) {
  const { children, ...otherProps } = props;
  return (
    <ButtonCommon {...otherProps} color="primary" size="small">
      {children}
    </ButtonCommon>
  );
}
export function ButtonSubmit(props: ButtonCommonProps) {
  const { children, ...otherProps } = props;
  return (
    <ButtonPositive {...otherProps} type="submit">
      {children}
    </ButtonPositive>
  );
}
export function ButtonCancel(props: ButtonCommonProps) {
  const { children, ...otherProps } = props;
  return (
    <ButtonCommon {...otherProps} color="primary" size="small">
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
export type ButtonBadgeProps = ButtonCommonProps & {
  badgeProps?: Partial<BadgeProps>;
};
export function ButtonBadge(props: ButtonBadgeProps) {
  const { children, badgeProps, ...otherProps } = props;
  return (
    <Badge {...badgeProps}>
      <ButtonCommon color="primary" size="small" {...otherProps}>
        {children}
      </ButtonCommon>
    </Badge>
  );
}
export type ButtonErrorProps = ButtonCommonProps & {
  errorIcon?: ComponentType<MuiIconProps>;
  errorText?: ReactNode;
  errorIconPosition?: 'start' | 'end';
};
export function ButtonError(props: ButtonErrorProps) {
  const { children, errorIcon, errorText, errorIconPosition = 'end', ...otherProps } = props;
  const errorIconProps = useMemo(() => {
    let Icon = errorIcon || ErrorIcon;
    return {
      [`${errorIconPosition}Icon`]: (
        <InputHelperTextWithIcon
          icon={<Icon fontSize="small" color="error" />}
          textProps={{
            textTransform: 'none',
            sx: { background: (t) => t?.palette?.error?.main },
          }}
          style={{
            display: 'inline-block',
            lineHeight: 'normal',
            fontSize: 0,
          }}
        >
          {errorText}
        </InputHelperTextWithIcon>
      ),
    };
  }, [errorIcon, errorText, errorIconPosition]);
  return (
    <ButtonCommon variant="contained" size="small" {...otherProps} {...errorIconProps}>
      {children}
    </ButtonCommon>
  );
}
