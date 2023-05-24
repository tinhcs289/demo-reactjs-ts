import type { SxProps, Theme } from '@mui/material';
export const stickyFirstClass = 'sticky-first';
export const stickyLastClass = 'sticky-last';
export const cellEndDividerSx: SxProps<Theme> = {
  '& th': {
    ':after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      background: (t) => t?.palette?.grey?.[300],
      top: '50%',
      transform: 'translateY(-50%)',
      right: 0,
      width: '2px',
      height: '60%',
      borderRadius: '2px',
      overflowY: 'hidden',
    },
    ':last-child': {
      ':after': {
        opacity: 0,
      },
    },
  },
};
export const stickySx: SxProps<Theme> = {
  position: 'sticky',
  whiteSpace: 'nowrap',
  overflowY: 'hidden',
  background: (t) => t?.palette?.background?.paper,
};
export const boxShadowCellFirst =
  '0px 0px 0 0 rgb(0 0 0 / 0%), 4px 0px 4px 0px rgb(0 0 0 / 14%), inset 0px 0 0 0 rgb(0 0 0 / 0%)';
export const boxShadowCellLast =
  '0px 0 0 0 rgb(0 0 0 / 0%), -4px 0 4px 0 rgb(0 0 0 / 14%), 0px 0 0 0 rgb(0 0 0 / 0%)';
export const stickyFirstSx: SxProps<Theme> = { left: 0, right: 'unset', boxShadow: boxShadowCellFirst };
export const stickyLastSx: SxProps<Theme> = { left: 'unset', right: 0, boxShadow: boxShadowCellLast };
export const stickyHeadCellSx: SxProps<Theme> = { ...stickySx, zIndex: (t) => t?.zIndex?.modal - 1 };
export const stickyBodyCellSx: SxProps<Theme> = { ...stickySx, zIndex: (t) => t?.zIndex?.modal - 2 };
export const CheckSellHeadSx: SxProps<Theme> = { ...stickyHeadCellSx, ...stickyFirstSx };
export const CheckSellBodySx: SxProps<Theme> = { ...stickyBodyCellSx, ...stickyFirstSx };
export const scrollWidth = 1.2;