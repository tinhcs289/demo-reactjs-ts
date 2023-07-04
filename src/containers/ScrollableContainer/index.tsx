import render from '@/helpers/reactHelpers/render';
import useToggle from '@/hooks/useToggle';
import { MuiIcon } from '@/types';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { styled } from '@mui/material';
import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import Grid, { GridProps } from '@mui/material/Grid';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { useCallback, useMemo, useRef, useState } from 'react';
const BoxSrcollable = styled(Box, { shouldForwardProp: (p) => p !== 'expand' })<
  BoxProps & { expand?: boolean }
>(({ expand }) => ({
  display: 'flex',
  ...(!expand
    ? { flexDirection: 'row' }
    : {
        alignItems: 'flex-start',
      }),
}));
const GridScollable = styled(Grid)<GridProps>({
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  maxWidth: '100%',
  overflowX: 'scroll',
  scrollBehavior: 'smooth',
  flexDirection: 'column',
  '&::-webkit-scrollbar': {
    background: 'transparent',
    WebkitAppearance: 'none',
    width: 0,
    height: 0,
  },
});
const IconButtonStyled = styled(IconButton)<IconButtonProps>({
  flex: 0,
});
const STEP = 100;
export type ScrollableContainerProps = BoxProps & {
  scrollStep?: number;
  contentProps?: Partial<GridProps>;
  buttonBack?: MuiIcon;
  buttonNext?: MuiIcon;
  togglable?: boolean;
  buttonExpand?: MuiIcon;
  buttonCollapse?: MuiIcon;
};
export default function ScrollableContainer(props: ScrollableContainerProps) {
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
  let scrl = useRef<HTMLElement>();
  const [expand, toggle] = useToggle(false);
  const [scrollX, setscrollX] = useState<number>(0);
  const [scrolEnd, setscrolEnd] = useState<boolean>(false);
  const slide = useCallback(
    (shift: number) => {
      if (!scrl?.current) return;
      scrl.current.scrollLeft += shift;
      setscrollX(scrollX + shift);
      const isScollEnd =
        Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <= scrl.current.offsetWidth;
      setscrolEnd(isScollEnd);
    },
    [scrollX]
  );
  const scrollCheck = useCallback(() => {
    if (!scrl?.current) return;
    setscrollX(scrl.current.scrollLeft);
    const isScollEnd =
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <= scrl.current.offsetWidth;
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
    return (
      <IconButtonStyled
        onClick={() => {
          toggle();
        }}
      >
        {render(expand ? IconCollapse : IconExpand, { fontSize: 'inherit' })}
      </IconButtonStyled>
    );
  }, [IconExpand, IconCollapse, expand, toggle, togglable]);
  const $Content = useMemo(
    () => (
      <GridScollable ref={scrl as any} onScroll={scrollCheck} container {...contentProps}>
        {children}
      </GridScollable>
    ),
    [scrollCheck, contentProps, children]
  );
  return (
    <BoxSrcollable width="100%" expand={expand} {...(!expand ? { height } : {})} {...otherProps}>
      {!expand ? (
        <>
          {$ButtonBack}
          {$Content}
          {$ButtonNext}
        </>
      ) : (
        <Grid item container xs={12}>
          {children}
        </Grid>
      )}
      {$ButtonExanpandOrCollapse}
    </BoxSrcollable>
  );
}
