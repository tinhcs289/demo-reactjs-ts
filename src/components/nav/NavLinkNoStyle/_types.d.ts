import type {
  ForwardRefExoticComponent,
  RefAttributes,
  MouseEventHandler,
  StyleHTMLAttributes,
  ReactNode,
} from 'react';
import type { NavLinkProps } from 'react-router-dom';
export type LinkProps = ForwardRefExoticComponent<NavLinkProps & RefAttributes<HTMLAnchorElement>> & {
  id?: string;
  fullWidth?: boolean;
  eventStopPropagation?: boolean;
  eventPreventDefault?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  children?: ReactNode;
  to: string;
  style?: Partial<StyleHTMLAttributes<'a'>>;
};
