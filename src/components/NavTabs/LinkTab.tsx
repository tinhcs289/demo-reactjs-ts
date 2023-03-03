import Tab from '@mui/material/Tab';
import type { MouseEventHandler, ReactNode } from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export type LinkTabProps = {
  label?: ReactNode;
  href?: string;
};
export default function LinkTab(props: LinkTabProps) {
  const navigate = useNavigate();
  const handleTabClick: MouseEventHandler<HTMLAnchorElement> = useCallback(
    (event) => {
      event?.preventDefault?.();
      navigate(props?.href || '#');
      return;
    },
    [navigate, props?.href]
  );
  return <Tab component="a" onClick={handleTabClick as any} {...props} />;
}
