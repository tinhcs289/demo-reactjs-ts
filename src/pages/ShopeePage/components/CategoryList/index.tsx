import { useCategoriesStore } from '@/pages/ShopeePage/context';
import type { Theme } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import type { BoxProps } from '@mui/material/Box';
import chunk from 'lodash/chunk';
import { useMemo } from 'react';
import { Scrollbar, Virtual } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import CategoryDupe from './CategoryDupe';
import CategoryItem from './CategoryItem';
import CategoryListBox from './CategoryListBox';

export default function CategoryList(props?: Omit<BoxProps, 'children'>) {
  const [categories] = useCategoriesStore((s) => s?.categories);

  const dupeCategories = useMemo(() => {
    if (!Array.isArray(categories)) return [];
    return chunk(categories, 2);
  }, [categories]);

  const isMediumScreenOrLarger = useMediaQuery((t: Theme) => t?.breakpoints?.up?.('md'));
  const isSmallScreenOrLarger = useMediaQuery((t: Theme) => t?.breakpoints?.up?.('sm'));
  const isLargeScreenOrLarger = useMediaQuery((t: Theme) => t?.breakpoints?.up?.('lg'));

  const slidesPerView = useMemo(() => {
    if (isLargeScreenOrLarger) return 12;
    if (isMediumScreenOrLarger) return 8;
    if (isSmallScreenOrLarger) return 6;
    return 4;
  }, [isMediumScreenOrLarger, isLargeScreenOrLarger, isSmallScreenOrLarger]);

  return (
    <CategoryListBox {...props}>
      <Swiper
        scrollbar={{ hide: true, draggable: true }}
        modules={[Scrollbar, Virtual]}
        slidesPerView={slidesPerView}
        virtual
      >
        {dupeCategories.map((dupe, i) => (
          <SwiperSlide key={`${dupe?.[0]?.catid || ''}_${dupe?.[1]?.catid || ''}`} virtualIndex={i}>
            <CategoryDupe container alignItems="flex-start">
              {!!dupe?.[0] ? <CategoryItem category={dupe[0]} /> : null}
              {!!dupe?.[1] ? <CategoryItem category={dupe[1]} /> : null}
            </CategoryDupe>
          </SwiperSlide>
        ))}
      </Swiper>
    </CategoryListBox>
  );
}
