import BoxHorizontalSrcoll from '@/components/box/BoxHorizontalSrcoll';
import type { FormComponent, FormProps } from '../_types';
import { GridItem } from '@/components/grid';
export default function withScollableWrapper(WrappedComponent: FormComponent): FormComponent {
  return function FormWithScollableWrapper(props: FormProps) {
    return (
      <GridItem disabledXs sx={{ flex: 1 }}>
        <BoxHorizontalSrcoll height="36px" togglable>
          <WrappedComponent {...props} />
        </BoxHorizontalSrcoll>
      </GridItem>
    );
  };
}
