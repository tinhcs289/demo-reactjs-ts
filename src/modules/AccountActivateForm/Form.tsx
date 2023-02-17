import FormGridItem from '@/components/form/FormGridItem';
import RHFText from '@/components/rhfInputs/RHFText';
import { required } from '@/constants/rhfRules';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { FormProps } from './_types';
export default function Form(props: FormProps) {
  const { t } = useTranslation();
  const { control } = useFormContext();
  return (
    <>
      <FormGridItem sx={{ p: 1 }}>
        <RHFText
          control={control}
          label="Tài khoản"
          name="username"
          rules={required(t('common:pleaseEnter'))}
          disabled
        />
      </FormGridItem>
      <FormGridItem sx={{ p: 1 }}>
        <RHFText
          control={control}
          label="Mã kích hoạt"
          name="optCode"
          rules={required(t('common:pleaseEnter'))}
          autoFocus
        />
      </FormGridItem>
    </>
  );
}
