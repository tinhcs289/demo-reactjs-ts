import type { TBodyCellInnerComponent } from '@/components/CommonTable/_types';
import CommonTooltip from '@/components/CommonTooltip';
import type { TAny } from '@/_types/TAny';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import HotelIcon from '@mui/icons-material/Hotel';
import type { SxProps, Theme } from '@mui/material';
import Alert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import { useMemo } from 'react';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import SearchIcon from '@mui/icons-material/Search';
import type { TOrderListItem } from '../_types';

const BookingItemShuttle = <T extends TAny>(props: { row: T }): JSX.Element => {
  return (
    <Card>
      <CardHeader
        avatar={<AirportShuttleIcon color="primary" />}
        action={
          <IconButton>
            <FileCopyIcon fontSize="small" />
          </IconButton>
        }
        title="Xe đưa đón"
        titleTypographyProps={{ sx: { fontWeight: (t) => t?.typography?.fontWeightBold } }}
        subheader={
          <>
            Sân bay - khách sạn - địa điểm
            <br />
            {`xe 4 chỗ`}
          </>
        }
      />
      <CardContent>
        <Alert severity="error" sx={{ mb: 1 }}>
          Dịch vụ không có sẵn
        </Alert>
        <Alert severity="warning">Khách hàng đối tác chưa hoàn tất thanh toán</Alert>
      </CardContent>
      <CardActions>
        <Button variant="contained" fullWidth startIcon={<SearchIcon />}>
          Đổi dịch vụ
        </Button>
      </CardActions>
    </Card>
  );
};

const BookingItemAccommodation = <T extends TAny>(props: { row: T }): JSX.Element => {
  return (
    <Card>
      <CardHeader
        avatar={<HotelIcon color="primary" />}
        action={
          <IconButton>
            <FileCopyIcon fontSize="small" />
          </IconButton>
        }
        title="Lưu trú"
        titleTypographyProps={{ sx: { fontWeight: (t) => t?.typography?.fontWeightBold } }}
        subheader={
          <>
            Sheraton Hà Nội
            <br />
            {`1 Deluxe`}&nbsp;&#183;&nbsp;{`3 người lớn`}
          </>
        }
      />
      <CardContent>
        <Alert severity="success" sx={{ mb: 1 }}>
          Kênh phân phối đã xác nhận cung cấp dịch vụ
        </Alert>
        <Alert severity="success">Khách hàng đối tác đã hoàn tất thanh toán</Alert>
      </CardContent>
      <CardActions>
        <Button variant="contained" fullWidth startIcon={<CheckIcon />} disabled>
          Chốt đơn
        </Button>
      </CardActions>
    </Card>
  );
};

const BookingItemFlightTicket = <T extends TAny>(props: { row: T }): JSX.Element => {
  return (
    <Card>
      <CardHeader
        avatar={<AirplaneTicketIcon color="primary" />}
        action={
          <IconButton>
            <FileCopyIcon fontSize="small" />
          </IconButton>
        }
        title="Vé máy bay"
        titleTypographyProps={{ sx: { fontWeight: (t) => t?.typography?.fontWeightBold } }}
        subheader={
          <>
            <b>THD</b>&nbsp;<b>HAN</b>&nbsp;&#183;&nbsp;<b>31DEC22</b>&nbsp;&#183;&nbsp;<b>1130</b>
            <br />
            {`3 người lớn`}
          </>
        }
      />
      <CardContent>
        <Alert severity="success" sx={{ mb: 1 }}>
          Kênh phân phối đã xác nhận cung cấp dịch vụ
        </Alert>
        <Alert severity="warning">Khách hàng đối tác chưa hoàn tất thanh toán</Alert>
      </CardContent>
      <CardActions>
        <Button variant="contained" fullWidth startIcon={<CheckIcon />} disabled>
          Chốt đơn
        </Button>
      </CardActions>
    </Card>
  );
};

const Services: TBodyCellInnerComponent<TOrderListItem, TAny> = ({ row }) => {
  const chipSx: SxProps<Theme> = useMemo(
    () => ({
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
    }),
    []
  );

  return (
    <>
      <CommonTooltip title={<BookingItemAccommodation row={row} />}>
        <Chip icon={<HotelIcon />} label="Lưu trú" size="small" sx={{ mb: '2px', ...chipSx }} />
      </CommonTooltip>
      <CommonTooltip title={<BookingItemShuttle row={row} />}>
        <Chip icon={<AirportShuttleIcon />} label="Xe đưa đón" size="small" sx={{ mb: '2px', ...chipSx }} />
      </CommonTooltip>
      <CommonTooltip title={<BookingItemFlightTicket row={row} />}>
        <Chip icon={<AirplaneTicketIcon />} label="Vé máy bay" size="small" sx={chipSx} />
      </CommonTooltip>
    </>
  );
};
export default Services;
