import type { AnyObject, MuiBreakPoint } from '@/types';
import type { BoxProps } from '@mui/material/Box';
import type { ComponentType, ReactNode, RefAttributes } from 'react';
import type { SwiperProps, SwiperRef } from 'swiper/react';
type ReactSwiperProps = RefAttributes<SwiperRef> & SwiperProps;
export type CommonGridSliderProps<T extends AnyObject> = Omit<ReactSwiperProps, 'slidesPerView'> & {
  data: T[];
  rows?: number;
  boxProps?: BoxProps;
  boxHeight?: `${number}px` | `${number}rem` | `${number}em` | `${number}%` | number;
  renderItem: ComponentType<{ item: T }> | ((props: { item: T }) => ReactNode);
  slidesPerView?: 'auto' | number | Partial<Record<MuiBreakPoint, number>>;
};
