import render from '@/helpers/reactHelpers/render';
import useToggle from '@/hooks/useToggle';
import type { MuiIcon } from '@/types';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { styled } from '@mui/material';
import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import type { GridProps } from '@mui/material/Grid';
import Grid from '@mui/material/Grid';
import type { IconButtonProps } from '@mui/material/IconButton';
import IconButton from '@mui/material/IconButton';
import debounce from 'lodash/debounce';
import type { UIEventHandler } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
const BoxSrcollable = styled(Box, { shouldForwardProp: (p) => p !== 'expand' })<
  BoxProps & { expand?: boolean }
>(({ expand }) => ({
  display: 'flex',
  zIndex: 1,
  ...(!expand
    ? { flexDirection: 'row' }
    : {
        alignItems: 'flex-start',
      }),
}));
const GridScollable = styled(Grid, { shouldForwardProp: (p) => p !== 'scrollable' && p !== 'expand' })<
  GridProps & { scrollable?: boolean; expand?: boolean }
>(({ scrollable: _scrollable, expand }) => ({
  display: 'flex',
  flex: 1,
  maxWidth: '100%',
  overflowX: 'scroll',
  scrollBehavior: 'smooth',
  flexDirection: expand ? 'row' : 'column',
  alignItems: 'flex-start',
  alignContent: 'flex-start',
  justifyContent: expand ? 'flex-start' : 'column',
  '&::-webkit-scrollbar': {
    background: 'transparent',
    WebkitAppearance: 'none',
    width: 0,
    height: 0,
  },
}));
const IconButtonStyled = styled(IconButton)<IconButtonProps>({
  flex: 0,
});
const STEP = 100;
export type BoxHorizontalSrcollProps = BoxProps & {
  scrollStep?: number;
  contentProps?: Partial<GridProps>;
  buttonBack?: MuiIcon;
  buttonNext?: MuiIcon;
  togglable?: boolean;
  buttonExpand?: MuiIcon;
  buttonCollapse?: MuiIcon;
};
export default function BoxHorizontalSrcoll(props: BoxHorizontalSrcollProps) {
  const {
    children,
    contentProps,
    scrollStep = STEP,
    togglable = false,
    buttonBack: IconBack = ChevronLeftIcon,
    buttonNext: IconNext = NavigateNextIcon,
    buttonExpand: IconExpand = UnfoldMoreIcon,
    buttonCollapse: IconCollapse = UnfoldLessIcon,
    height,
    ...otherProps
  } = props;
  let scrollRef = useRef<HTMLElement>();
  const [expand, toggle] = useToggle(false);
  const [scrollable, setScrollable] = useState<boolean>(false);
  const [scrollX, setscrollX] = useState<number>(0);
  const [scrolEnd, setscrolEnd] = useState<boolean>(false);
  const slide = useCallback(
    (shift: number) => {
      if (!scrollRef?.current) return;
      scrollRef.current.scrollLeft += shift;
      setscrollX(scrollX + shift);
      const isScollEnd =
        Math.floor(scrollRef.current.scrollWidth - scrollRef.current.scrollLeft) <=
        scrollRef.current.offsetWidth;
      setscrolEnd(isScollEnd);
    },
    [scrollX]
  );
  const scrollCheck: UIEventHandler<HTMLDivElement> = useCallback(() => {
    if (!scrollRef?.current) return;
    setscrollX(scrollRef.current.scrollLeft);
    const isScollEnd =
      Math.floor(scrollRef.current.scrollWidth - scrollRef.current.scrollLeft) <=
      scrollRef.current.offsetWidth;
    setscrolEnd(isScollEnd);
  }, []);
  const $ButtonBack = useMemo(() => {
    if (scrollX === 0) return null;
    return (
      <IconButtonStyled onClick={() => slide(-1 * scrollStep)}>
        {render(IconBack, { fontSize: 'inherit' })}
      </IconButtonStyled>
    );
  }, [scrollX, slide, scrollStep, IconBack]);
  const $ButtonNext = useMemo(() => {
    if (scrolEnd) return null;
    return (
      <IconButtonStyled onClick={() => slide(scrollStep)}>
        {render(IconNext, { fontSize: 'inherit' })}
      </IconButtonStyled>
    );
  }, [scrolEnd, slide, scrollStep, IconNext]);
  const $ButtonExanpandOrCollapse = useMemo(() => {
    if (!togglable) return null;
    if (!expand && !scrollable) return null;
    return (
      <IconButtonStyled onClick={toggle as any}>
        {render(expand ? IconCollapse : IconExpand, { fontSize: 'inherit' })}
      </IconButtonStyled>
    );
  }, [IconExpand, IconCollapse, expand, toggle, togglable, scrollable]);
  const handleOnChangeWidth = useCallback(
    (div: HTMLElement) => {
      if (!div) return;
      const shouldToggled = div.scrollWidth > div.offsetWidth;
      setScrollable(shouldToggled);
      scrollCheck(null as any);
    },
    [scrollCheck]
  );
  useEffect(() => {
    if (!scrollRef.current) return;
    const handler = debounce(() => {
      if (!scrollRef.current) return;
      handleOnChangeWidth(scrollRef.current);
    }, 200);
    const resizeObserver = new ResizeObserver(handler);
    resizeObserver.observe(scrollRef.current);
    return () => resizeObserver.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const $Content = useMemo(
    () => (
      <GridScollable
        ref={scrollRef as any}
        container
        {...(!scrollable ? { item: true, xs: 12 } : { onScroll: scrollCheck })}
        {...contentProps}
        scrollable={scrollable}
        expand={expand}
      >
        {children}
      </GridScollable>
    ),
    [scrollCheck, contentProps, children, scrollable, expand]
  );
  const shouldDisplayNavigator = useMemo(() => !expand && scrollable, [expand, scrollable]);
  const heightComputed = useMemo(() => (!expand ? height : 'auto'), [expand, height]);
  return (
    <BoxSrcollable width="100%" expand={expand} height={heightComputed} {...otherProps}>
      {shouldDisplayNavigator ? $ButtonBack : null}
      {$Content}
      {shouldDisplayNavigator ? $ButtonNext : null}
      {$ButtonExanpandOrCollapse}
    </BoxSrcollable>
  );
}
