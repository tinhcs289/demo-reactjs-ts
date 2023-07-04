import ScrollableContainer from '@/containers/ScrollableContainer';
import type { FormComponent, FormProps } from '../_types';
import { GridItem } from '@/components/grid';
export default function withScollableWrapper(WrappedComponent: FormComponent): FormComponent {
  return function FormWithScollableWrapper(props: FormProps) {
    return (
      <GridItem disabledXs sx={{ flex: 1 }}>
        <ScrollableContainer height="36px" togglable>
          <WrappedComponent {...props} />
        </ScrollableContainer>
      </GridItem>
    );
  };
}
