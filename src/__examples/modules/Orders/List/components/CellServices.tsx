import CommonTooltip from '@/components/box/CommonTooltip';
import { createCellInnerComponent } from '@/components/table';
import type { AnyObject } from '@/types';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import CheckIcon from '@mui/icons-material/Check';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import HotelIcon from '@mui/icons-material/Hotel';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import type { ChipProps } from '@mui/material/Chip';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
const ChipStyled = styled(Chip)<ChipProps>(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  borderRadius: theme.spacing(0.5),
  transform: 'all ease .3s',
  ':hover': {
    boxShadow: theme.shadows[4],
    cursor: 'pointer',
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '& svg': {
      color: theme.palette.primary.contrastText,
    },
  },
}));
const BookingItemShuttle = <T extends AnyObject>(props: { row: T }): JSX.Element => {
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
const BookingItemAccommodation = <T extends AnyObject>(props: { row: T }): JSX.Element => {
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
const BookingItemFlightTicket = <T extends AnyObject>(props: { row: T }): JSX.Element => {
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
const CellServices = createCellInnerComponent(function Services(props) {
  const { row } = props;
  return (
    <>
      <CommonTooltip title={<BookingItemAccommodation row={row} />}>
        <ChipStyled icon={<HotelIcon />} label="Lưu trú" size="small" sx={{ mb: '2px' }} />
      </CommonTooltip>
      <CommonTooltip title={<BookingItemShuttle row={row} />}>
        <ChipStyled icon={<AirportShuttleIcon />} label="Xe đưa đón" size="small" sx={{ mb: '2px' }} />
      </CommonTooltip>
      <CommonTooltip title={<BookingItemFlightTicket row={row} />}>
        <ChipStyled icon={<AirplaneTicketIcon />} label="Vé máy bay" size="small" />
      </CommonTooltip>
    </>
  );
});
export default CellServices;
