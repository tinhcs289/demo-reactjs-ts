import render from '@/helpers/reactHelpers/render';
import { MuiIcon } from '@/types';
import { styled } from '@mui/material';
import ButtonBase from '@mui/material/ButtonBase';
import type { GridProps } from '@mui/material/Grid';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';
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
export default function ToolItem(
  props?: { icon?: MuiIcon; title?: ReactNode; subTitle?: ReactNode } & GridProps
) {
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
