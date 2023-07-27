import type { RHFTextProps } from '@/components/rhfInputs/RHFText';
import useToggle from '@/hooks/useToggle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import type { ComponentType } from 'react';
import { useMemo } from 'react';
export default function withShowOrHidePassword(
  WrappedComponent: ComponentType<RHFTextProps>
): ComponentType<RHFTextProps> {
  return function FieldWithShowOrHidePassword(props: RHFTextProps) {
    const [isShowPassword, toggleShowPassword] = useToggle(false);
    const type = useMemo(() => (isShowPassword ? 'text' : 'password'), [isShowPassword]);
    const $EndAdornment = useMemo(
      () => (
        <IconButton
          size="small"
          onClick={(e) => {
            e?.stopPropagation?.();
            toggleShowPassword();
          }}
        >
          {isShowPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </IconButton>
      ),
      [isShowPassword, toggleShowPassword]
    );
    return (
      <WrappedComponent
        {...props}
        InputProps={{
          ...props?.InputProps,
          endAdornment: $EndAdornment,
        }}
        type={type}
      />
    );
  };
}
