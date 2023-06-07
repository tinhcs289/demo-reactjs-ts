import capitalizeFirstLetter from '@/helpers/stringHelpers/capitalizeFirstLetter';
import type { HtmlElementProps } from '@/types';
import { styled } from '@mui/material';
import type { ReactNode } from 'react';
export type ButtonIconAdornmentProps = {
  children?: ReactNode;
  position?: 'start' | 'end';
  size?: 'small' | 'medium' | 'large' | 'inherit';
};
const SpanStyled = styled('span', {
  shouldForwardProp: (p) => p !== 'position',
})<HtmlElementProps & { position?: 'start' | 'end' }>(({ position }) => ({
  display: 'inherit',
  ...(position === 'start'
    ? {
        marginRight: '8px',
        marginLeft: '-4px',
      }
    : {}),
  ...(position === 'end'
    ? {
        marginRight: '-4px',
        marginLeft: '8px',
      }
    : {}),
}));
export default function ButtonIconAdornment(props: ButtonIconAdornmentProps) {
  const { children, position = 'start', size = 'small' } = props;
  return (
    <SpanStyled
      position={position}
      className={`MuiButton-${position}Icon MuiButton-iconSize${capitalizeFirstLetter(size)}`}
    >
      {children}
    </SpanStyled>
  );
}
