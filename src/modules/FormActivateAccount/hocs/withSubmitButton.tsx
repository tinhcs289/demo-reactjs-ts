import { ButtonSubmit } from '@/components/buttons';
import { formItemSx } from '@/components/form';
import { GridItem } from '@/components/grid';
import type { FormComponent, FormProps } from '../_types';
export default function withSubmitButton(WrappedComponent: FormComponent): FormComponent {
  return function FormWithSubmitButton(props: FormProps) {
    return (
      <>
        <WrappedComponent {...props} />
        <GridItem sx={formItemSx}>
          <ButtonSubmit id="activate-account-form:button:submit" fullWidth>
            Kích hoạt
          </ButtonSubmit>
        </GridItem>
      </>
    );
  };
}
