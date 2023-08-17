import CommonGridSlider from '@/components/box/CommonGridSlider';
import type { BoxProps } from '@mui/material/Box';
import { useMemo } from 'react';
import { default as CategoriesProvider, useCategoriesStore } from '../context';
import CategoryItem from './CategoryItem';
function List(props?: Omit<BoxProps, 'children'>) {
  const [categories] = useCategoriesStore((s) => s?.categories);
  const data = useMemo(() => categories || [], [categories]);
  return <CommonGridSlider data={data} renderItem={CategoryItem} boxProps={props} rows={2} />;
}
export default function CategoryList(props?: Omit<BoxProps, 'children'>) {
  return (
    <CategoriesProvider>
      <List {...props} />
    </CategoriesProvider>
  );
}
