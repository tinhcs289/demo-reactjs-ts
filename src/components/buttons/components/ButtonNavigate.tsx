import NavLinkNoStyle from '@/components/nav/NavLinkNoStyle';
import type { ButtonCommonProps } from './ButtonCommon';
import ButtonCommon from './ButtonCommon';
export type ButtonNavigateProps = ButtonCommonProps & { to: string };
export default function ButtonNavigate(props: ButtonNavigateProps) {
  const { children, to, ...otherProps } = props;
  return (
    <NavLinkNoStyle to={to || '#'}>
      <ButtonCommon color="primary" size="small" {...otherProps}>
        {children}
      </ButtonCommon>
    </NavLinkNoStyle>
  );
}
