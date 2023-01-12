import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import type { NavLinkProps } from 'react-router-dom';
export type LinkProps = ForwardRefExoticComponent<NavLinkProps & RefAttributes<HTMLAnchorElement>>;