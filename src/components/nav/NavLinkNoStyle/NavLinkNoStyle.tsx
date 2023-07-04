import { NavLink } from 'react-router-dom';
import type { LinkProps } from './_types';
export default function NavLinkNoStyle(props: LinkProps) {
  const {
    children,
    to,
    style,
    onClick,
    fullWidth = false,
    eventStopPropagation,
    eventPreventDefault,
    ...otherProps
  } = props;
  return (
    <NavLink
      {...otherProps}
      to={(to as string) || ''}
      style={{
        textDecoration: 'none',
        color: 'inherit',
        ...(fullWidth ? { width: '100%' } : {}),
        ...style,
      }}
      onClick={(e) => {
        if (eventStopPropagation) {
          e?.stopPropagation?.();
        }
        if (eventPreventDefault) {
          e?.preventDefault?.();
        }
        onClick?.(e);
      }}
    >
      {children}
    </NavLink>
  );
}
