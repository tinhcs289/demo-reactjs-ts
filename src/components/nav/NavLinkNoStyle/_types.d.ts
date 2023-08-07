import type {
  ForwardRefExoticComponent,
  RefAttributes,
  MouseEventHandler,
  StyleHTMLAttributes,
  ReactNode,
} from 'react';
import type { NavLinkProps } from 'react-router-dom';
type BaseProps = Partial<ForwardRefExoticComponent<NavLinkProps & RefAttributes<HTMLAnchorElement>>>;
export type LinkProps = BaseProps & {
  id?: string;
  fullWidth?: boolean;
  eventStopPropagation?: boolean;
  eventPreventDefault?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  children?: ReactNode;
  to: string;
  style?: Partial<StyleHTMLAttributes<'a'>>;
  openInNewTab?: boolean;
  nagivateInParent?: boolean;
  navigateInRootParent?: boolean;
};
