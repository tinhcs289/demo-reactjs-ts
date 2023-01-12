import { CURRENCY_FORMAT } from '@/constants/language';
import render from '@/helpers/reactHelpers/render';
import { TMuiIcon } from '@/_types/TMuiIcon';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { styled } from '@mui/material';
import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import type { GridProps } from '@mui/material/Grid';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import type { PaperProps } from '@mui/material/Paper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import numeral from 'numeral';
import type { ReactNode } from 'react';

const BoxStyled = styled(Box)<BoxProps>(({ theme }) => ({
  padding: 0,
  margin: 0,
  display: 'flex',
  justifyContent: 'center',
  position: 'relative',
  height: theme.spacing(9),
}));

const PaperStyled = styled(Paper)<PaperProps>(({ theme }) => ({
  height: theme.spacing(10),
  width: '95%',
  position: 'absolute',
  zIndex: 1,
  bottom: theme.spacing(0),
  left: '50%',
  transform: 'translateX(-50%)',
  margin: '0 auto',
  [theme.breakpoints.up('md')]: {
    width: `${theme.breakpoints.values.md * 0.95}px`,
  },
  [theme.breakpoints.up('lg')]: {
    width: `${theme.breakpoints.values.md * 0.95}px`,
  },
}));

const GridStyled = styled(Grid)<GridProps>(({ theme }) => ({
  padding: theme.spacing(0.5),
  position: 'relative',
  height: '100%',
  ':after': {
    content: '""',
    display: 'block',
    position: 'absolute',
    background: theme.palette.grey[500],
    top: '50%',
    transform: 'translateY(-50%)',
    right: 0,
    width: '1px',
    height: '60%',
    borderRadius: '2px',
    overflowY: 'hidden',
  },
  ':last-child': {
    ':after': {
      opacity: 0,
    },
  },
}));

const ToolButton = styled(Grid)<GridProps>(({ theme }) => ({
  userSelect: 'none',
  padding: '4px',
  width: '100%',
  ':hover': {
    cursor: 'pointer',
    background: theme.palette.action.hover,
  },
}));

function ToolItem(props?: { icon?: TMuiIcon; title?: ReactNode; subTitle?: ReactNode } & GridProps) {
  const { title, icon, subTitle, ...otherProps } = props || {};
  return (
    <GridStyled {...otherProps} container alignItems="center">
      <ButtonBase sx={{ width: '100%' }}>
        <ToolButton item xs={12} container alignItems="flex-start" justifyContent="space-between">
          {!!props?.icon ? (
            <Grid xs={2} item>
              {render(props.icon, { fontSize: 'small', color: 'primary' })}&nbsp;
            </Grid>
          ) : null}
          <Grid item xs={10} container flexDirection="column" justifyContent="flex-start" textAlign="left">
            {!!props?.title ? (
              <Typography fontSize="small" sx={{ fontWeight: 700 }}>
                {props.title}
              </Typography>
            ) : null}
            {!!props?.subTitle ? (
              <Typography fontSize="small" color="GrayText" sx={{ lineHeight: '1.2em' }}>
                {props.subTitle}
              </Typography>
            ) : null}
          </Grid>
        </ToolButton>
      </ButtonBase>
    </GridStyled>
  );
}

export default function QuickTools() {
  return (
    <BoxStyled>
      <PaperStyled elevation={4}>
        <Grid container alignItems="center" sx={{ height: '100%' }} justifyContent="space-between">
          <GridStyled item xs={2} container justifyContent="center" alignContent="center">
            <IconButton>
              <QrCodeScannerIcon color="primary" />
            </IconButton>
          </GridStyled>
          <ToolItem
            item
            xs={5}
            icon={AccountBalanceWalletIcon}
            title="Ví ShopeePay"
            subTitle={`Voucher giảm đến ${numeral(40000).format(CURRENCY_FORMAT)}`}
          />
          <ToolItem item xs={5} icon={MonetizationOnIcon} title={`${76000} xu`} subTitle="Đổi xu lấy mã giảm giá" />
        </Grid>
      </PaperStyled>
    </BoxStyled>
  );
}
