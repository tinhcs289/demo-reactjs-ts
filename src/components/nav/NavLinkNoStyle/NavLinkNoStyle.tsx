import { NavLink } from 'react-router-dom';
import type { LinkProps } from './_types';
import type { ReactNode } from 'react';
export default function NavLinkNoStyle(props: Partial<LinkProps & { children?: ReactNode; to: string }>) {
  const { children, to, ...otherProps } = props as any;
  return (
    <NavLink {...otherProps} to={to as any} style={{ textDecoration: 'none', color: 'inherit' }}>
      {children}
    </NavLink>
  );
}
