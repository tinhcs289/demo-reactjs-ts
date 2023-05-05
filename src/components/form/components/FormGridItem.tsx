import { GridItem } from '@/components/grid';
import { useMemo } from 'react';
import type { FormGridItemProps } from '../_types';
export default function FormGridItem(props: FormGridItemProps) {
  const { children, disabledXs, ...otherProps } = props;
  const xs = useMemo(() => {
    if (!disabledXs) return { xs: 12 };
    return {};
  }, [disabledXs]);
  return (
    <GridItem {...otherProps} {...xs}>
      {children}
    </GridItem>
  );
}
