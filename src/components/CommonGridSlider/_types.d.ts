import type { TAny, TMuiBreakPoint } from '@/types';
import type { BoxProps } from '@mui/material/Box';
import type { ComponentType, ReactNode, RefAttributes } from 'react';
import type { SwiperProps, SwiperRef } from 'swiper/react';

type ReactSwiperProps = RefAttributes<SwiperRef> & SwiperProps;

export type TCommonGridSliderProps<T extends TAny> = Omit<ReactSwiperProps, 'slidesPerView'> & {
  data: T[];
  rows?: number;
  boxProps?: BoxProps;
  boxHeight?: `${number}px` | `${number}rem` | `${number}em` | `${number}%` | number;
  renderItem: ComponentType<{ item: T }> | ((props: { item: T }) => ReactNode);
  slidesPerView?: 'auto' | number | Partial<Record<TMuiBreakPoint, number>>;
};
