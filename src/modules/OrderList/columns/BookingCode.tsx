import type { TBodyCellInnerComponent } from '@/components/CommonTable/_types';
import type { TAny } from '@/_types/TAny';
import type { TOrderListItem } from '../_types';
import Chip from '@mui/material/Chip';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { useCallback } from 'react';
import useSnackbarNotify from '@/hooks/useSnackbarNotify';
import { NavLink } from 'react-router-dom';
import PATHS from '@/routes/paths';

const BookingCode: TBodyCellInnerComponent<TOrderListItem, TAny> = ({ row }) => {
  const { showSuccessNotify } = useSnackbarNotify();

  const copyBookingCode = useCallback(
    (e: any) => {
      e?.preventDefault?.();
      if (!navigator?.clipboard?.writeText || !row?.bookingCode) return;
      navigator.clipboard.writeText(row.bookingCode);
      showSuccessNotify(`đã sao chép mã đơn hàng ${row.bookingCode}`);
    },
    [row, showSuccessNotify],
  );

  return (
    <NavLink to={PATHS.dashboard2} style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
      <Chip
        icon={<OpenInNewIcon />}
        label={row?.bookingCode || ''}
        size="small"
        color="info"
        sx={{ borderRadius: (t) => t?.spacing?.(0.5) }}
        deleteIcon={<FileCopyIcon />}
        onDelete={copyBookingCode as any}
      />
    </NavLink>
  );
};
export default BookingCode;
