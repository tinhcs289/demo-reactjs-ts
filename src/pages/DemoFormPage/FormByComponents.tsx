import FormSubmitButton from '@/components/buttons/FormSubmitButton';
import FormGridContainer from '@/components/form/FormGridContainer';
import FormGridItem from '@/components/form/FormGridItem';
import RHFCheck from '@/components/rhfInputs/RHFCheck';
import RHFCheckGroup from '@/components/rhfInputs/RHFCheckGroup';
import RHFDate from '@/components/rhfInputs/RHFDate';
import RHFDateMulti from '@/components/rhfInputs/RHFDateMulti';
import RHFDateMultiPicker from '@/components/rhfInputs/RHFDateMultiPicker';
import RHFDateMultiPickerWithTags from '@/components/rhfInputs/RHFDateMultiPickerWithTags';
import RHFDateTime from '@/components/rhfInputs/RHFDateTime';
import RHFNumber from '@/components/rhfInputs/RHFNumber';
import RHFRadio from '@/components/rhfInputs/RHFRadio';
import RHFRadioGroup from '@/components/rhfInputs/RHFRadioGroup';
import RHFSelect from '@/components/rhfInputs/RHFSelect';
import RHFSelectBoolean from '@/components/rhfInputs/RHFSelectBoolean';
import RHFSwitch from '@/components/rhfInputs/RHFSwitch';
import RHFSwitchGroup from '@/components/rhfInputs/RHFSwitchGroup';
import RHFTagInput from '@/components/rhfInputs/RHFTagInput';
import RHFText from '@/components/rhfInputs/RHFText';
import RHFTime from '@/components/rhfInputs/RHFTime';
import { required } from '@/constants/rhfRules';
import type { SxProps, Theme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { defaultValues, LABEL, optionRadio, options, optionsCheck } from './constants';
import type { TFormData } from './_types';

const fieldSx: SxProps<Theme> = { p: 1, mb: 2 };

export default function FormByComponents() {
  const { t } = useTranslation();

  const { handleSubmit, control } = useForm<TFormData>({ defaultValues: defaultValues as any });

  const onSubmit = (formData: TFormData) => {
    console.log(formData);
  };

  return (
    <FormGridContainer onSubmit={handleSubmit(onSubmit)} formProps={{ id: 'demo-form-2' }}>
      <FormGridItem lg={4} sx={fieldSx}>
        <RHFSwitch
          id="demo-form-2:switch:turn-me"
          control={control}
          name="SwitchField"
          label={LABEL}
          rules={required(t('common:pleaseSelect'))}
        />
      </FormGridItem>
      <FormGridItem lg={4} sx={fieldSx}>
        <RHFCheck
          id="demo-form-2:check:check-me"
          control={control}
          name="CheckField"
          label={LABEL}
          rules={required(t('common:pleaseSelect'))}
        />
      </FormGridItem>
      <FormGridItem lg={4} sx={fieldSx}>
        <RHFRadio id="demo-form-2:radio:choose-me" control={control} name="RadioField" label={LABEL} />
      </FormGridItem>
      <FormGridItem md={6} lg={3} sx={fieldSx}>
        <RHFText
          id="demo-form-2:text:type-me"
          name="TextField"
          label={LABEL}
          control={control}
          rules={required(t('common:pleaseEnter'))}
          placeholder={t<string>('common:pleaseEnter')}
        />
      </FormGridItem>
      <FormGridItem md={6} lg={3} sx={fieldSx}>
        <RHFSelect
          id="demo-form-2:select:select-me"
          control={control}
          name="SelectField"
          label={LABEL}
          rules={required(t('common:pleaseSelect'))}
          placeholder={t<string>('common:pleaseSelect')}
          options={options}
        />
      </FormGridItem>
      <FormGridItem md={6} lg={3} sx={fieldSx}>
        <RHFSelect
          id="demo-form-2:select:select-us"
          multiple
          limitTags={1}
          control={control}
          name="SelectMultiField"
          label={LABEL}
          rules={required(t('common:pleaseSelect'))}
          placeholder={t<string>('common:pleaseSelect')}
          TextFieldProps={{ placeholder: t<string>('common:pleaseSelect') }}
          options={options}
        />
      </FormGridItem>
      <FormGridItem md={6} lg={3} sx={fieldSx}>
        <RHFSelectBoolean
          id="demo-form-2:select-boolean:select-yes-no"
          control={control}
          name="SelectBooleanField"
          label={LABEL}
          labelTrue={t<string>('common:yes')}
          labelFalse={t<string>('common:no')}
          TextFieldProps={{ placeholder: t<string>('common:pleaseSelect') }}
        />
      </FormGridItem>
      <FormGridItem md={5} sx={fieldSx}>
        <RHFDate
          id="demo-form-2:date:select-me"
          control={control}
          name="DateField"
          label={LABEL}
          rules={required(t('common:pleaseSelect'))}
          placeholder={t<string>('common:pleaseSelect')}
        />
      </FormGridItem>
      <FormGridItem md={5} sx={fieldSx}>
        <RHFDateTime
          id="demo-form-2:date-time:select-me"
          control={control}
          name="DateTimeField"
          label={LABEL}
          rules={required(t('common:pleaseSelect'))}
          placeholder={t<string>('common:pleaseSelect')}
        />
      </FormGridItem>
      <FormGridItem md={2} sx={fieldSx}>
        <RHFTime
          id="demo-form-2:time:select-me"
          control={control}
          name="TimeField"
          label={LABEL}
          rules={required(t('common:pleaseSelect'))}
          placeholder={t<string>('common:pleaseSelect')}
        />
      </FormGridItem>
      <FormGridItem md={4} sx={fieldSx}>
        <RHFCheckGroup
          id="demo-form-2:check-group:check-us"
          control={control}
          name="CheckGroupField"
          label={LABEL}
          rules={required(t('common:pleaseSelect'))}
          options={optionsCheck}
        />
      </FormGridItem>
      <FormGridItem md={4} sx={fieldSx}>
        <RHFRadioGroup
          id="demo-form-2:radio-group:choose-one"
          control={control}
          name="RadioGroupField"
          label={LABEL}
          rules={required(t('common:pleaseSelect'))}
          options={optionRadio}
        />
      </FormGridItem>
      <FormGridItem md={4} sx={fieldSx}>
        <RHFSwitchGroup
          id="demo-form-2:switch-group:turn-us"
          control={control}
          name="SwithGroupField"
          label={LABEL}
          rules={required(t('common:pleaseSelect'))}
          options={optionRadio}
        />
      </FormGridItem>
      <FormGridItem lg={4} sx={fieldSx}>
        <RHFDateMultiPicker
          id="demo-form-2:date-time:select-us"
          control={control}
          name="DateMultiField"
          label={LABEL}
          rules={required(t('common:pleaseSelect'))}
        />
      </FormGridItem>
      <FormGridItem lg={8} sx={fieldSx}>
        <RHFDateMultiPickerWithTags
          id="demo-form-2:date-time:select-us-2"
          control={control}
          name="DateMultiField2"
          label={LABEL}
          rules={required(t('common:pleaseSelect'))}
        />
      </FormGridItem>
      <FormGridItem sx={fieldSx}>
        <RHFDateMulti
          id="demo-form-3:date-time:select-us-3"
          control={control}
          name="DateMultiField3"
          label={LABEL}
          rules={required(t('common:pleaseSelect'))}
        />
      </FormGridItem>
      <FormGridItem md={3} sx={fieldSx}>
        <RHFNumber
          id="demo-form-2:number:type-me"
          control={control}
          name="NumberField"
          label={LABEL}
          placeholder={t<string>('common:pleaseEnter')}
          rules={required(t('common:pleaseEnter'))}
        />
      </FormGridItem>
      <FormGridItem md={9} sx={fieldSx}>
        <RHFTagInput
          id="demo-form-2:tags-text:type-me"
          control={control}
          name="TagInputField"
          label={'Từ khoá'}
          placeholder={'nhập từ khoá'}
          rules={required(t('common:pleaseEnter'))}
        />
      </FormGridItem>

      <FormGridItem justifyContent="center" contentProps={{ md: 2 }} sx={{ p: 1 }}>
        <FormSubmitButton id="demo-form-2:button:submit">{t('common:submit')}</FormSubmitButton>
      </FormGridItem>
    </FormGridContainer>
  );
}
