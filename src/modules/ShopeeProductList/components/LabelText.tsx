import { styled } from '@mui/material';
import type { TypographyProps } from '@mui/material/Typography';
import Typography from '@mui/material/Typography';
import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';

export const LabelTextGroup = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  height: '1.8rem',
  alignItems: 'center',
  overflow: 'hidden',
  gap: '4px',
}));

const LabelText = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontSize: 'small',
  padding: theme.spacing(0.125),
}));

export const LabelPromo = styled(LabelText)<TypographyProps>(({ theme }) => ({
  color: theme.palette.primary.main,
  border: `1px solid ${theme.palette.primary.main}`,
}));

const BG_VOUCHER = 'rgb(246, 145, 19)';
export const LabelVoucher = styled(LabelText)<TypographyProps>(({ theme }) => ({
  background: BG_VOUCHER,
  color: theme.palette.common.white,
  border: `1px solid ${BG_VOUCHER}`,
}));
