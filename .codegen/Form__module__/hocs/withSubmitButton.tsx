//@ts-nocheck --entire-file
import { GridItem } from '@/components/grid';
import type { FormComponent, FormProps } from '../_types';
import { ButtonSubmit } from '@/components/buttons';
export default function withSubmitButton(WrappedComponent: FormComponent): FormComponent {
  return function FormWithSubmitButton(props: FormProps) {
    return (
      <>
        <WrappedComponent {...props} />
        <GridItem sx={{ p: 2 }}>
          <ButtonSubmit>{`Lưu`}</ButtonSubmit>
        </GridItem>
      </>
    );
  };
}
