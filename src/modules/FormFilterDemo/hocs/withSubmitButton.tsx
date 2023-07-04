import { ButtonSubmit } from '@/components/buttons';
import { FormGridItem } from '@/components/form';
import { useTranslation } from 'react-i18next';
import type { FormComponent, FormProps } from '../_types';
import { fieldSx } from '../constants';
export default function withSubmitButton(WrappedComponent: FormComponent): FormComponent {
  return function FormContactWithSubmitButton(props: FormProps) {
    const { t } = useTranslation();
    return (
      <>
        <WrappedComponent {...props} />
        <FormGridItem disabledXs sx={fieldSx}>
          <ButtonSubmit id="demo-form:button:submit" size="small">
            {t('common:submit')}
          </ButtonSubmit>
        </FormGridItem>
      </>
    );
  };
}
