import FormGridItem from '@/components/form/FormGridItem';
import RHFSelect from '@/components/rhfInputs/RHFSelect';
import RHFText from '@/components/rhfInputs/RHFText';
import { email, phone, required } from '@/constants/rhfRules';
import newGuid from '@/helpers/stringHelpers/newGuid';
import { actions as snackbar } from '@/redux/snackbar';
import Button from '@mui/material/Button';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { genderOptions, itemSx } from './contants';
import type { FormProps } from './_types';
export default function Form(props: FormProps) {
  const { t } = useTranslation();
  const { control } = useFormContext();
  const dispatch = useDispatch();
  return (
    <>
      <Button
        onClick={() => {
          dispatch(snackbar.pushMessageError({ content: newGuid() }));
        }}
      >
        aaaaaaaaaaaaaaaaa
      </Button>
      <FormGridItem sx={itemSx} lg={3}>
        <RHFText
          control={control}
          name="Title"
          label={t('contact:title')}
          rules={required(t('common:pleaseEnter'))}
        />
      </FormGridItem>
      <FormGridItem sx={itemSx} lg={3}>
        <RHFText
          control={control}
          name="FirstName"
          label={t('contact:firstName')}
          rules={required(t('common:pleaseEnter'))}
        />
      </FormGridItem>
      <FormGridItem sx={itemSx} lg={3}>
        <RHFText
          control={control}
          name="MiddleName"
          label={t('contact:middleName')}
          rules={required(t('common:pleaseEnter'))}
        />
      </FormGridItem>
      <FormGridItem sx={itemSx} lg={3}>
        <RHFText
          control={control}
          name="LastName"
          label={t('contact:lastName')}
          rules={required(t('common:pleaseEnter'))}
        />
      </FormGridItem>
      <FormGridItem sx={itemSx} lg={3}>
        <RHFSelect
          control={control}
          name="Gender"
          label={t('contact:gender')}
          rules={required(t('common:pleaseSelect'))}
          options={genderOptions}
        />
      </FormGridItem>
      <FormGridItem sx={itemSx} lg={6}>
        <RHFText
          control={control}
          name="PhoneNumber"
          label={t('contact:phoneNumber')}
          rules={{ ...required(t('common:pleaseEnter')), ...phone(t('common:invalidPhone')) }}
        />
      </FormGridItem>
      <FormGridItem sx={itemSx} lg={6}>
        <RHFText
          control={control}
          name="EmailAddress"
          label={t('contact:emailAddress')}
          rules={{ ...required(t('common:pleaseEnter')), ...email(t('common:invalidPhone')) }}
        />
      </FormGridItem>
      <FormGridItem sx={itemSx}>
        <RHFText
          control={control}
          name="Address"
          label={t('contact:address')}
          rules={{ ...required(t('common:pleaseEnter')), ...email(t('common:invalidPhone')) }}
          multiline
          minRows={3}
        />
      </FormGridItem>
    </>
  );
}
