import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import type { NavLinkProps as LinkProps } from 'react-router-dom';
export type NavLinkProps = Omit<
  ForwardRefExoticComponent<LinkProps & RefAttributes<HTMLAnchorElement>>,
  'to' | 'href'
>;
