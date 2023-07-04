import type { MuiIconProps } from '@/types';
import type { ButtonCommonProps } from './ButtonCommon';
import ButtonCommon from './ButtonCommon';
import type { ComponentType, ReactNode } from 'react';
import { useMemo } from 'react';
import { InputHelperTextWithIcon } from '@/components/formGroup';
import ErrorIcon from '@mui/icons-material/Error';
export type ButtonErrorProps = ButtonCommonProps & {
  errorIcon?: ComponentType<MuiIconProps>;
  errorText?: ReactNode;
  errorIconPosition?: 'start' | 'end';
};
export default function ButtonError(props: ButtonErrorProps) {
  const { children, errorIcon, errorText, errorIconPosition = 'end', ...otherProps } = props;
  const errorIconProps = useMemo(() => {
    let Icon = errorIcon || ErrorIcon;
    return {
      [`${errorIconPosition}Icon`]: (
        <InputHelperTextWithIcon
          icon={<Icon fontSize="small" color="error" />}
          textProps={{
            textTransform: 'none',
            sx: { background: (t) => t?.palette?.error?.main },
          }}
          style={{
            display: 'inline-block',
            lineHeight: 'normal',
            fontSize: 0,
          }}
        >
          {errorText}
        </InputHelperTextWithIcon>
      ),
    };
  }, [errorIcon, errorText, errorIconPosition]);
  return (
    <ButtonCommon variant="contained" size="small" {...otherProps} {...errorIconProps}>
      {children}
    </ButtonCommon>
  );
}
