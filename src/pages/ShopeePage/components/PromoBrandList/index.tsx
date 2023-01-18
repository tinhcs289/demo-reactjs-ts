import CommonGridSlider from '@/components/CommonGridSlider';
import { usePromoBrandsStore } from '@/pages/ShopeePage/context/PromoBrandsProvider';
import type { BoxProps } from '@mui/material/Box';
import { useMemo } from 'react';
import BrandItem from './BrandItem';

export default function PromoBrandList(props?: Omit<BoxProps, 'children'>) {
  const [shops] = usePromoBrandsStore((s) => s?.shops);

  const data = useMemo(() => shops || [], [shops]);

  return (
    <CommonGridSlider
      data={data}
      renderItem={BrandItem}
      boxProps={props}
      slidesPerView={{ xs: 2, sm: 4, md: 6, lg: 8 }}
      boxHeight="236px"
    />
  );
}
