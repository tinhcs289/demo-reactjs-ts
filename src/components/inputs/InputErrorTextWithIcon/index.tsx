import ErrorIcon from '@mui/icons-material/Error';
import type { Theme } from '@mui/material';
import { styled } from '@mui/material';
import type { TypographyProps } from '@mui/material/Typography';
import Typography from '@mui/material/Typography';
import React from 'react';
import { InputErrorTextWithIconProps } from './_types';

const TypographyError = styled(Typography)<TypographyProps>((args: { theme: Theme }) => {
  const { theme } = args;
  return {
    position: 'absolute',
    color: theme.palette.error.contrastText,
    background: theme.palette.error.main,
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
      borderBottom: `${theme.spacing(0.5)}px solid ${theme.palette.error.main}`,
    },
    whiteSpace: 'nowrap',
    userSelect: 'none',
  };
});

const InputErrorTextWithIcon = styled((props: InputErrorTextWithIconProps) => {
  const { children, textProps, ...divElementProps } = props;
  return (
    <div {...divElementProps}>
      <ErrorIcon color="error" />
      <TypographyError {...textProps}>{children}</TypographyError>
    </div>
  );
})((args: { theme: Theme }) => {
  return {
    position: 'relative',
  };
}) as React.FC<InputErrorTextWithIconProps>;
export default InputErrorTextWithIcon;
