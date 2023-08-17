import { createCellInnerComponent } from '@/components/table';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ButtonGroup from '@mui/material/ButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import type { RowData } from '../_types';
import { AsyncListItemActionsPopoverToggle } from '../context';
const CellAction = createCellInnerComponent<RowData>(function BookingCode(props) {
  const { row } = props;
  return (
    <ButtonGroup fullWidth size="small">
      <Tooltip title="Luồng xử lý">
        <IconButton color="primary">
          <AccountTreeIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Tạo bản sao">
        <IconButton color="primary">
          <ContentCopyIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Phân xử lý">
        <IconButton color="primary">
          <AssignmentReturnIcon sx={{ transform: `rotateY(-180deg)` }} />
        </IconButton>
      </Tooltip>
      <AsyncListItemActionsPopoverToggle row={row} />
    </ButtonGroup>
  );
});
export default CellAction;
