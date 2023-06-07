import { GridItem } from '@/components/grid';
import { formItemSx } from '@/components/form';
import type { FormComponent, FormProps } from '../_types';
import { ButtonSubmit } from '@/components/buttons';
import { useTranslation } from 'react-i18next';
export default function withSubmitButton(WrappedComponent: FormComponent): FormComponent {
  return function FormWithSubmitButton(props: FormProps) {
    const { t } = useTranslation();
    return (
      <>
        <WrappedComponent {...props} />
        <GridItem sx={formItemSx}>
          <ButtonSubmit id="login-form:button:submit" fullWidth>
            {t('login:login')}
          </ButtonSubmit>
        </GridItem>
      </>
    );
  };
}
