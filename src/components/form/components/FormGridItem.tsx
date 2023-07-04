import { GridItem } from '@/components/grid';
import type { FormGridItemProps } from '../_types';
export default function FormGridItem(props: FormGridItemProps) {
  const { children, disabledXs, ...otherProps } = props;
  return (
    <GridItem {...otherProps} disabledXs={disabledXs}>
      {children}
    </GridItem>
  );
}
