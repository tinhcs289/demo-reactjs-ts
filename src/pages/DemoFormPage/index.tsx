import FormGridContainer from '@/components/form/FormGridContainer';
import FormGridItem from '@/components/form/FormGridItem';
import RHFCheck from '@/components/rhfInputs/RHFCheck';
import RHFCheckGroup from '@/components/rhfInputs/RHFCheckGroup';
import RHFDate from '@/components/rhfInputs/RHFDate';
import RHFDateMulti from '@/components/rhfInputs/RHFDateMulti';
import RHFDateTime from '@/components/rhfInputs/RHFDateTime';
import RHFRadio from '@/components/rhfInputs/RHFRadio';
import RHFRadioGroup from '@/components/rhfInputs/RHFRadioGroup';
import RHFSelect from '@/components/rhfInputs/RHFSelect';
import RHFSelectBoolean from '@/components/rhfInputs/RHFSelectBoolean';
import RHFSwitch from '@/components/rhfInputs/RHFSwitch';
import RHFText from '@/components/rhfInputs/RHFText';
import { required } from '@/constants/rhfRules';
import { useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { defaultValues, LABEL, optionRadio, options, optionsCheck } from './constants';
import type { TFormData } from './_types';

export default function DemoFormPage() {
  const theme = useTheme();
  const { t } = useTranslation();

  const { handleSubmit, control } = useForm<TFormData>({ defaultValues: defaultValues as any });

  const onSubmit = (formData: TFormData) => {
    console.log(formData);
  };

  return (
    <Container maxWidth="lg">
      <FormGridContainer
        onSubmit={handleSubmit(onSubmit)}
        formProps={{ id: 'demo-form', noValidate: true, sx: { mt: 4 } }}
      >
        <FormGridItem xs={4}>
          <RHFSwitch
            id="demo-form:switch:turn-me"
            control={control}
            name="SwitchField"
            label={LABEL}
            rules={required(t('common:pleaseSelect'))}
            sx={{ mb: theme.spacing(5) }}
          />
        </FormGridItem>
        <FormGridItem xs={4}>
          <RHFCheck
            id="demo-form:check:check-me"
            control={control}
            name="CheckField"
            label={LABEL}
            rules={required(t('common:pleaseSelect'))}
            sx={{ mb: theme.spacing(5) }}
          />
        </FormGridItem>
        <FormGridItem xs={4}>
          <RHFRadio
            id="demo-form:radio:choose-me"
            control={control}
            name="RadioField"
            label={LABEL}
            sx={{ mb: theme.spacing(5) }}
          />
        </FormGridItem>
        <FormGridItem xs={3}>
          <RHFText
            id="demo-form:text:type-me"
            name="TextField"
            label={LABEL}
            control={control}
            rules={required(t('common:pleaseEnter'))}
            sx={{ mb: theme.spacing(3) }}
          />
        </FormGridItem>
        <FormGridItem xs={3}>
          <RHFSelect
            id="demo-form:select:select-me"
            control={control}
            name="SelectField"
            label={LABEL}
            rules={required(t('common:pleaseSelect'))}
            options={options}
            sx={{ mb: theme.spacing(3) }}
          />
        </FormGridItem>
        <FormGridItem xs={3}>
          <RHFSelect
            id="demo-form:select:select-us"
            multiple
            limitTags={1}
            control={control}
            name="SelectMultiField"
            label={LABEL}
            rules={required(t('common:pleaseSelect'))}
            TextFieldProps={{ placeholder: t<string>('common:pleaseSelect') }}
            options={options}
            sx={{ mb: theme.spacing(3) }}
          />
        </FormGridItem>
        <FormGridItem xs={3}>
          <RHFSelectBoolean
            id="demo-form:select-boolean:select-yes-no"
            control={control}
            name="SelectBooleanField"
            label={LABEL}
            labelTrue={t<string>('common:yes')}
            labelFalse={t<string>('common:no')}
            TextFieldProps={{ placeholder: t<string>('common:pleaseSelect') }}
            sx={{ mb: theme.spacing(3) }}
          />
        </FormGridItem>
        <FormGridItem xs={12}>
          <RHFDate
            id="demo-form:date:select-me"
            control={control}
            name="DateField"
            label={LABEL}
            sx={{ mb: theme.spacing(3) }}
          />
        </FormGridItem>
        <FormGridItem xs={12}>
          <RHFDateTime
            id="demo-form:date-time:select-me"
            control={control}
            name="DateTimeField"
            label={LABEL}
            sx={{ mb: theme.spacing(3) }}
          />
        </FormGridItem>
        <FormGridItem xs={4}>
          <RHFCheckGroup
            id="demo-form:check-group:check-us"
            control={control}
            name="CheckGroupField"
            label={LABEL}
            rules={required(t('common:pleaseSelect'))}
            sx={{ my: theme.spacing(3) }}
            options={optionsCheck}
          />
        </FormGridItem>
        <FormGridItem xs={4}>
          <RHFRadioGroup
            id="demo-form:radio-group:choose-one"
            control={control}
            name="RadioGroupField"
            label={LABEL}
            rules={required(t('common:pleaseSelect'))}
            sx={{ my: theme.spacing(3) }}
            options={optionRadio}
          />
        </FormGridItem>
        <FormGridItem xs={4}>
          <RHFDateMulti
            id="demo-form:date-time:select-us"
            control={control}
            name="DateMultiField"
            label={LABEL}
            sx={{ mb: theme.spacing(3) }}
          />
        </FormGridItem>
        <FormGridItem xs={12} justifyContent="center" contentProps={{ md: 2 }}>
          <Button
            id="demo-form:button:submit"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {t('common:submit')}
          </Button>
        </FormGridItem>
      </FormGridContainer>
    </Container>
  );
}
