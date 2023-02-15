import render from '@/helpers/reactHelpers/render';
import { TAny, TMuiBreakPoint } from '@/types';
import type { SxProps, Theme } from '@mui/material';
import { styled, useMediaQuery } from '@mui/material';
import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import type { GridProps } from '@mui/material/Grid';
import Grid from '@mui/material/Grid';
import chunk from 'lodash/chunk';
import { useCallback, useMemo } from 'react';
import { Scrollbar, Virtual } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { TCommonGridSliderProps } from './_types';

const HEIGHT = 200;

const SliderBox = styled(Box)<BoxProps>(({ theme }) => ({
  padding: 0,
  margin: theme.spacing(1, 0),
}));

const SliderItemColumn = styled(Grid)<GridProps>(({ theme }) => ({
  width: '100%',
  margin: 0,
  padding: 0,
}));

const SliderItemWrap = styled(Grid)<GridProps>(({ theme }) => ({
  padding: '1px',
}));

const SliderItem = styled(Grid)<GridProps>(({ theme }) => ({
  background: theme.palette.mode === 'dark' ? theme.palette.common.black : theme.palette.grey[200],
  textAlign: 'center',
}));

function Item(props?: GridProps & { rows?: number }) {
  const { children, rows, sx, ...otherProps } = props || {};
  const memoRows = useMemo(() => (!!rows && Number.isInteger(rows) ? rows : 1), [rows]);

  const memoSx: SxProps<Theme> = useMemo(() => {
    if (memoRows === 1) return { ...sx, height: '100%' };
    return { ...sx, height: `${100 / memoRows}%` };
  }, [sx, memoRows]);

  return (
    <SliderItemWrap {...otherProps} sx={memoSx} item container>
      <SliderItem item xs={12}>
        {children}
      </SliderItem>
    </SliderItemWrap>
  );
}

function useSlidesPerViewByScreen(slidesPerView?: number | 'auto' | Partial<Record<TMuiBreakPoint, number>>) {
  const isSmallScreenOrLarger = useMediaQuery((t: Theme) => t?.breakpoints?.up?.('sm'));
  const isMediumScreenOrLarger = useMediaQuery((t: Theme) => t?.breakpoints?.up?.('md'));
  const isLargeScreenOrLarger = useMediaQuery((t: Theme) => t?.breakpoints?.up?.('lg'));
  const isExtraLargeScreenOrLarger = useMediaQuery((t: Theme) => t?.breakpoints?.up?.('xl'));

  const memoSlidesPerView = useMemo(() => {
    if (!slidesPerView || slidesPerView === 'auto') {
      if (isLargeScreenOrLarger) return 12;
      if (isMediumScreenOrLarger) return 8;
      if (isSmallScreenOrLarger) return 6;
      return 4;
    }

    if (typeof slidesPerView === 'number') {
      if (isLargeScreenOrLarger) return 12;
      if (isMediumScreenOrLarger) return 8;
      if (isSmallScreenOrLarger) return 6;
      return slidesPerView;
    }

    if (typeof slidesPerView === 'object') {
      if (isExtraLargeScreenOrLarger && !!slidesPerView.xl) return slidesPerView.lg;
      if (isLargeScreenOrLarger) return slidesPerView.lg || 12;
      if (isMediumScreenOrLarger) return slidesPerView.md || 8;
      if (isSmallScreenOrLarger) return slidesPerView.sm || 6;
      return slidesPerView.xs || 4;
    }
  }, [
    slidesPerView,
    isMediumScreenOrLarger,
    isLargeScreenOrLarger,
    isSmallScreenOrLarger,
    isExtraLargeScreenOrLarger,
  ]);

  return { slidesPerView: memoSlidesPerView };
}

export default function CommonGridSlider<T extends TAny>(props: TCommonGridSliderProps<T>) {
  const {
    data,
    boxHeight,
    rows,
    boxProps,
    renderItem,
    slidesPerView: propSlidesPerView,
    ...otherProps
  } = props;

  const memoHeight: string = useMemo(() => {
    let h: string = `${HEIGHT}px`;
    if (typeof boxHeight === 'number') h = `${boxHeight}px`;
    if (typeof boxHeight === 'string') h = boxHeight;
    return h;
  }, [boxHeight]);

  const memoBoxProps = useMemo(() => {
    const { sx, ...otherBoxProps } = boxProps || {};
    return {
      ...otherBoxProps,
      sx: { ...sx, height: memoHeight },
    };
  }, [boxProps, memoHeight]);

  const memoRows = useMemo(() => rows || 1, [rows]);

  const columns = useMemo(() => {
    if (!Array.isArray(data)) return [];
    return chunk(data, memoRows);
  }, [data, memoRows]);

  const { slidesPerView } = useSlidesPerViewByScreen(propSlidesPerView);

  const renderColumn = useCallback(
    (item: T) => {
      return render(renderItem, { item });
    },
    [renderItem]
  );

  const $columns = useMemo(() => {
    return columns.map((column, i) => (
      <SwiperSlide key={i} virtualIndex={i}>
        <SliderItemColumn
          container
          flexDirection="column"
          alignItems="flex-start"
          sx={{ height: memoHeight }}
        >
          {column.map((item, j) => {
            return (
              <Item key={j} rows={memoRows}>
                {renderColumn(item)}
              </Item>
            );
          })}
        </SliderItemColumn>
      </SwiperSlide>
    ));
  }, [columns, renderColumn, memoRows, memoHeight]);

  return (
    <SliderBox {...memoBoxProps}>
      <Swiper
        scrollbar={{ hide: true, draggable: true }}
        modules={[Scrollbar, Virtual]}
        slidesPerView={slidesPerView}
        virtual
        {...otherProps}
      >
        {$columns}
      </Swiper>
    </SliderBox>
  );
}
