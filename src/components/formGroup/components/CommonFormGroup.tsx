import { TextWithRequiredMark } from '@/components/typo';
import { styled } from '@mui/material';
import type { FormGroupProps } from '@mui/material/FormGroup';
import FormGroup from '@mui/material/FormGroup';
import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { inputLabelStyles, optionBackground } from '../functions';
import type { CommonFormLabelProps } from './CommonFormLabel';
import CommonFormLabel from './CommonFormLabel';
import InputErrorTextWithIcon from './InputErrorTextWithIcon';
const FormGroupStyled = styled(FormGroup)<FormGroupProps>(({ theme }) => ({
  width: '100%',
  position: 'relative',
  fontSize: theme.spacing(2),
  '& > legen.MuiFormLabel-root': {
    marginBottom: theme.spacing(0.5),
  },
  '& > label.MuiFormLabel-root': {
    position: 'absolute',
    top: 0,
    // the same styles as TextField
    ...inputLabelStyles(theme),
  },
  '& label.MuiFormControlLabel-root': {
    marginRight: 0,
    marginLeft: 0,
    minHeight: '42px',
    '&:not(:last-child)': {
      marginBottom: theme.spacing(0.25),
    },
    ...optionBackground(theme),
    '& > span:first-of-type': {
      alignSelf: 'flex-start',
    },
  },
}));
export type CommonFormGroupProps = FormGroupProps & {
  label?: ReactNode;
  labelProps?: Partial<CommonFormLabelProps>;
  disableLabelTransform?: boolean;
  required?: boolean;
  error?: boolean;
  errorText?: ReactNode;
};
export default function CommonFormGroup(props: CommonFormGroupProps) {
  const {
    label,
    labelProps,
    required,
    error,
    errorText,
    children,
    disableLabelTransform = false,
    ...otherProps
  } = props;
  const $Label = useMemo(() => {
    if (!label && !errorText) return;
    return (
      <CommonFormLabel
        {...({ component: 'label' } as any)}
        error={error}
        disableTransform={disableLabelTransform}
        {...labelProps}
      >
        {!label ? null : <TextWithRequiredMark required={required}>{label}</TextWithRequiredMark>}
        {!!error && !!errorText ? (
          <>
            &nbsp;<InputErrorTextWithIcon>{errorText}</InputErrorTextWithIcon>
          </>
        ) : null}
      </CommonFormLabel>
    );
  }, [error, errorText, label, required, labelProps, disableLabelTransform]);
  return (
    <FormGroupStyled {...otherProps}>
      {$Label}
      {children}
    </FormGroupStyled>
  );
}
