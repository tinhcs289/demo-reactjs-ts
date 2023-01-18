import CommonGridSlider from '@/components/CommonGridSlider';
import { useCategoriesStore } from '@/pages/ShopeePage/context/CategoriesProvider';
import type { BoxProps } from '@mui/material/Box';
import { useMemo } from 'react';
import CategoryItem from './CategoryItem';

export default function CategoryList(props?: Omit<BoxProps, 'children'>) {
  const [categories] = useCategoriesStore((s) => s?.categories);

  const data = useMemo(() => categories || [], [categories]);

  return <CommonGridSlider data={data} renderItem={CategoryItem} boxProps={props} rows={2} />;
}
