import { FormGridItem } from '@/components/form';
import RHFText from '@/components/rhfInputs/RHFText';
import { required } from '@/constants/rhfRules';
import type { SxProps, Theme } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { FormProps } from '../_types';
const itemSx: SxProps<Theme> = { p: 1 };
export default function FormFields(props: FormProps) {
  const { t } = useTranslation();
  const { control } = useFormContext();
  return (
    <>
      <FormGridItem sx={itemSx}>
        <RHFText
          control={control}
          label="Tài khoản"
          name="username"
          rules={required(t('common:pleaseEnter'))}
          disabled
        />
      </FormGridItem>
      <FormGridItem sx={itemSx}>
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
