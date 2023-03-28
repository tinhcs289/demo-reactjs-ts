import type { TBodyCellInnerComponent } from '@/components/CommonTable';
import useSnackbarNotify from '@/hooks/useSnackbarNotify';
import PATHS  from '@/constants/paths';
import type { TAny } from '@/types';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Chip from '@mui/material/Chip';
import { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import type { TOrderListItem } from '../_types';

const BookingCode: TBodyCellInnerComponent<TOrderListItem, TAny> = ({ row }) => {
  const { showSuccessNotify } = useSnackbarNotify();

  const copyBookingCode = useCallback(
    (e: any) => {
      e?.preventDefault?.();
      if (!navigator?.clipboard?.writeText || !row?.bookingCode) return;
      navigator.clipboard.writeText(row.bookingCode);
      showSuccessNotify(`đã sao chép mã đơn hàng ${row.bookingCode}`);
    },
    [row, showSuccessNotify]
  );

  return (
    <NavLink to={PATHS.demoTable} style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
      <Chip
        icon={<OpenInNewIcon />}
        label={row?.bookingCode || ''}
        size="small"
        sx={{
          fontWeight: (t) => t?.typography?.fontWeightBold,
          borderRadius: (t) => t?.spacing?.(0.5),
          transform: 'all ease .3s',
          ':hover': {
            boxShadow: (t) => t?.shadows?.['4'],
            cursor: 'pointer',
            background: (t) => t?.palette?.primary?.main,
            color: (t) => t?.palette?.primary?.contrastText,
            '& svg': {
              color: (t) => t?.palette?.primary?.contrastText,
            },
          },
        }}
        deleteIcon={<FileCopyIcon />}
        onDelete={copyBookingCode as any}
      />
    </NavLink>
  );
};
export default BookingCode;
