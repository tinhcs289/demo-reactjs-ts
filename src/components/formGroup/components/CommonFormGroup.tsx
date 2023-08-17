import { TextWithRequiredMark } from '@/components/typo';
import { styled } from '@mui/material';
import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
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
const BoxStyled = styled(Box, { shouldForwardProp: (p) => p !== 'inputBoxScrollHeight' })<
  BoxProps & { inputBoxScrollHeight?: string | number }
>(({ theme, inputBoxScrollHeight }) => ({
  width: '100%',
  ...(!!inputBoxScrollHeight
    ? {
        padding: theme.spacing(2, 0, 2, 2),
        overflowY: 'scroll',
        maskImage: `linear-gradient(to top, transparent, black), linear-gradient(to left, transparent 17px, black 17px)`,
        maskSize: `100% 20000px`,
        maskPosition: `left bottom`,
        WebkitMaskImage: `linear-gradient(to top, transparent, black), linear-gradient(to left, transparent 17px, black 17px)`,
        WebkitMaskSize: '100% 20000px',
        WebkitMaskPosition: 'left bottom',
        transition: 'mask-position 0.3s, -webkit-mask-position 0.3s',
        '&:hover': {
          WebkitMaskPosition: 'left top',
        },
        height: inputBoxScrollHeight,
      }
    : {}),
}));
export type CommonFormGroupProps = FormGroupProps & {
  label?: ReactNode;
  labelProps?: Partial<CommonFormLabelProps>;
  disableFloatingLabel?: boolean;
  required?: boolean;
  error?: boolean;
  errorText?: ReactNode;
  inputBoxProps?: Partial<BoxProps>;
  inputBoxScrollHeight?: string | number;
};
export default function CommonFormGroup(props: CommonFormGroupProps) {
  const {
    label,
    labelProps,
    required,
    error,
    errorText,
    children,
    disableFloatingLabel = false,
    inputBoxProps,
    inputBoxScrollHeight,
    ...otherProps
  } = props;
  const $Label = useMemo(() => {
    if (!label && !errorText) return;
    return (
      <CommonFormLabel
        {...({ component: 'label' } as any)}
        error={error}
        disableFloatingLabel={disableFloatingLabel}
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
  }, [error, errorText, label, required, labelProps, disableFloatingLabel]);
  return (
    <FormGroupStyled {...otherProps}>
      {$Label}
      <BoxStyled {...inputBoxProps} inputBoxScrollHeight={inputBoxScrollHeight}>
        {children}
      </BoxStyled>
    </FormGroupStyled>
  );
}
