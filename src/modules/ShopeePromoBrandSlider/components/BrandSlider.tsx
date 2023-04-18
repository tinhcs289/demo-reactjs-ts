import CommonGridSlider from '@/components/CommonGridSlider';
import type { BoxProps } from '@mui/material/Box';
import { useMemo } from 'react';
import { default as PromoBrandsProvider, usePromoBrandState } from '../context';
import BrandItem from './BrandItem';
function Slider(props?: Omit<BoxProps, 'children'>) {
  const shops = usePromoBrandState((s) => s?.shops);
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
export default function BrandSlider(props?: Omit<BoxProps, 'children'>) {
  return (
    <PromoBrandsProvider>
      <Slider {...props} />
    </PromoBrandsProvider>
  );
}
