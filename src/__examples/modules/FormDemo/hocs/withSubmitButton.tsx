import { ButtonSubmit } from '@/components/buttons';
import { FormGridItem } from '@/components/form';
import { useTranslation } from 'react-i18next';
import type { FormComponent, FormProps } from '../_types';
export default function withSubmitButton(WrappedComponent: FormComponent): FormComponent {
  return function FormContactWithSubmitButton(props: FormProps) {
    const { t } = useTranslation();
    return (
      <>
        <WrappedComponent {...props} />
        <FormGridItem contentProps={{ display: 'flex', justifyContent: 'center' }} sx={{ p: 1 }}>
          <ButtonSubmit id="demo-form:button:submit">{t('common:submit')}</ButtonSubmit>
        </FormGridItem>
      </>
    );
  };
}
