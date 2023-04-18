import usePrevious from '@/hooks/usePrevious';
import Tab from '@mui/material/Tab';
import type { TabsProps } from '@mui/material/Tabs';
import Tabs from '@mui/material/Tabs';
import { styled } from '@mui/material/styles';
import type { MouseEventHandler, ReactNode, SyntheticEvent } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { NavTabsProps } from './_types';
type LinkTabProps = {
  label?: ReactNode;
  href?: string;
};
function LinkTab(props: LinkTabProps) {
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
const TabsStyled = styled(Tabs, {
  shouldForwardProp: (prop) => prop !== 'stickyTop',
})<TabsProps & { stickyTop?: boolean }>(({ theme, stickyTop }) => ({
  background: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.grey[300]}`,
  ...(stickyTop
    ? {
        position: 'sticky',
        left: 0,
        top: 0,
        background: theme.palette.background.paper,
        zIndex: theme.zIndex.drawer,
        width: '100%',
      }
    : {}),
}));
export default function NavTabs(props: NavTabsProps) {
  const { defaultValue = 0, dataTabs, stickyTop } = props;
  const location = useLocation();
  const prePathname = usePrevious((location?.pathname || '').split(/[?#]/)[0]);
  const isMatchPath = useCallback(
    (url?: string, isExact?: boolean) => {
      if (!url || !location?.pathname) return false;

      const current = location?.pathname.split(/[?#]/)[0];
      if (!current) return false;
      if (current === url) return true;
      if (isExact && current.indexOf(url) > -1) return true;
      return false;
    },
    [location?.pathname]
  );
  const findMatchIndex = useCallback(
    () =>
      dataTabs
        ?.map((item, i) => {
          return isMatchPath(item?.url, false) ? i : -1;
        })
        .find((i) => i >= 0) || defaultValue,
    [isMatchPath, defaultValue, dataTabs]
  );
  const index = useMemo(() => findMatchIndex(), [findMatchIndex]);
  const [value, setValue] = useState(index);
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  useEffect(() => {
    if (!location?.pathname) return;
    const newPath = location?.pathname.split(/[?#]/)[0];
    if (newPath !== prePathname) {
      const newIndex = findMatchIndex();
      setValue(newIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location?.pathname, findMatchIndex]);
  if (!dataTabs || !Array.isArray(dataTabs) || dataTabs.length === 0) return null;
  return (
    <TabsStyled
      value={value}
      onChange={handleChange}
      variant="scrollable"
      scrollButtons="auto"
      allowScrollButtonsMobile
      stickyTop={stickyTop}
    >
      {dataTabs.map((item) => (
        <LinkTab key={item.id} label={item?.label} href={item?.url || ''} />
      ))}
    </TabsStyled>
  );
}
