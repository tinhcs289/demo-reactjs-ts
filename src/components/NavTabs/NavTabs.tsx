import asideMenuItems from '@/constants/asideMenuItems';
import usePrevious from '@/hooks/usePrevious';
import type { SyntheticEvent } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import LinkTab from './LinkTab';
import TabsStyled from './TabsStyled';
import type { TNavTabsProps } from './_types';
const data = asideMenuItems[0]?.childs || [];
export default function NavTabs(props: TNavTabsProps) {
  const { defaultValue = 0, dataTabs = data, stickyTop } = props;
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
  return (
    <TabsStyled
      value={value}
      onChange={handleChange}
      variant="scrollable"
      scrollButtons="auto"
      allowScrollButtonsMobile
      stickyTop={stickyTop}
    >
      {data.map((item) => (
        <LinkTab key={item.id} label={item?.label} href={item?.url || ''} />
      ))}
    </TabsStyled>
  );
}
