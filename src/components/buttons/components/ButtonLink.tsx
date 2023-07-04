import NavLinkNoStyle from '@/components/nav/NavLinkNoStyle';
import type { ButtonCommonProps } from './ButtonCommon';
import ButtonCommon from './ButtonCommon';
export type ButtonLinkProps = ButtonCommonProps & { to: string };
export default function ButtonLink(props: ButtonLinkProps) {
  const { children, to, ...otherProps } = props;
  return (
    <NavLinkNoStyle to={to || '#'}>
      <ButtonCommon color="primary" variant="text" size="small" noTextTransform {...otherProps}>
        {children}
      </ButtonCommon>
    </NavLinkNoStyle>
  );
}
