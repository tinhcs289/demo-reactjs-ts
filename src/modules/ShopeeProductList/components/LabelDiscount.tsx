import { styled } from '@mui/material';
import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';

const LabelWrap = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'absolute',
  right: 0,
  top: 0,
  zIndex: 1,
}));

const Label = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  position: 'relative',
  color: '#ee4d2d',
  backgroundColor: `rgba(255,212,36,.9)`,
  textTransform: 'uppercase',
  ':after': {
    content: "''",
    width: 0,
    height: 0,
    left: 0,
    bottom: '-4px',
    position: 'absolute',
    borderColor: 'transparent rgba(255,212,36,.9)',
    borderStyle: 'solid',
    borderWidth: '0 18px 4px',
  },
}));

export default function LabelDiscount(props?: { discount?: ReactNode }) {
  return (
    <LabelWrap>
      <Label>
        <Typography fontSize="small">{props?.discount}</Typography>
        <Typography fontSize="small" color="white">{`giảm`}</Typography>
      </Label>
    </LabelWrap>
  );
}
