import InfoIcon from '@mui/icons-material/Info';
import type { Theme } from '@mui/material';
import { styled } from '@mui/material';
import type { TypographyProps } from '@mui/material/Typography';
import Typography from '@mui/material/Typography';
import type { ComponentType } from 'react';
import type { InputHelperTextWithIconProps } from './_types';

const TypographyStyled = styled(Typography)<TypographyProps>((args: { theme: Theme }) => {
  const { theme } = args;
  return {
    position: 'absolute',
    color: theme.palette.primary.contrastText,
    background: theme.palette.primary.main,
    padding: theme.spacing(0.5),
    borderRadius: theme.spacing(0.5),
    zIndex: 1,
    top: theme.spacing(3),
    right: '-50%',
    boxShadow: theme.shadows['3'],
    '::before': {
      position: 'absolute',
      content: '""',
      display: 'block',
      right: theme.spacing(2),
      top: theme.spacing(-0.5),
      width: 0,
      height: 0,
      borderLeft: `${theme.spacing(0.5)}px solid transparent`,
      borderRight: `${theme.spacing(0.5)}px solid transparent`,
      borderBottom: `${theme.spacing(0.5)}px solid ${theme.palette.primary.main}`,
    },
    whiteSpace: 'nowrap',
    userSelect: 'none',
  };
});

const InputHelperTextWithIcon = styled((props: InputHelperTextWithIconProps) => {
  const { children, textProps, icon, ...divElementProps } = props;
  return (
    <div {...divElementProps}>
      <>
        {icon || <InfoIcon color="primary" fontSize="small" />}
        <TypographyStyled {...textProps}>{children}</TypographyStyled>
      </>
    </div>
  );
})((args: { theme: Theme }) => {
  return {
    position: 'relative',
  };
}) as ComponentType<InputHelperTextWithIconProps>;
export default InputHelperTextWithIcon;
