import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import type { NavLinkProps } from 'react-router-dom';

export type TNavLinkProps = Omit<
  ForwardRefExoticComponent<NavLinkProps & RefAttributes<HTMLAnchorElement>>,
  'to' | 'href'
>;
