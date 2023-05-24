import type { FieldComponentProps } from '@/components/form';
import type { ComponentType } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
type Props = FieldComponentProps<'text'>;
export default function withPasswordAndPasswordReEnterdMustMatch(RHFField: ComponentType<Props>) {
  return function PasswordAndPasswordReEnterdMustMatch(props: Props) {
    const { rules, ...otherProps } = props;
    const { t } = useTranslation();
    const { control } = useFormContext();
    const password = useWatch({ name: 'Password', control }) as string;
    return (
      <RHFField
        {...otherProps}
        rules={{
          ...rules,
          validate: {
            ...rules?.validate,
            PasswordAndPasswordReEnterdMustMatch: (reEnteredPassword: string) =>
              reEnteredPassword === password || t<string>('register:passwordDoesntMatch'),
          },
        }}
      />
    );
  };
}
