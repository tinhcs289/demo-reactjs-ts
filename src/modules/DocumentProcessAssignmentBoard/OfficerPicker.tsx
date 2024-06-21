import { CommonTypography } from '@/components/typo';
import EMPTY_GUID from '@/helpers/stringHelpers/EMPTY_GUID';
import { styled } from '@mui/material';
import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Draggable } from 'react-beautiful-dnd';
import OfficerPickerItemList from './OfficerPickerItemList';
const BoxColumn = styled(Box)<BoxProps>({
  flex: 2,
  display: 'flex',
  flexDirection: 'column',
  maxHeight: '600px',
  overflowY: 'auto',
});
const BoxColumnGrabToDrag = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderTopLeftRadius: '2px',
  borderTopRightRadius: '2px',
  backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.common.black,
  transition: 'background-color 0.2s ease',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[900],
  },
  height: 40,
}));
function OfficerPickerHeader() {
  return (
    <BoxColumnGrabToDrag>
      <Box display="flex" justifyContent="center" alignItems="center" width="100%" height="100%">
        <CommonTypography
          textAlign="center"
          textTransform="uppercase"
          fontWeight={500}
          color="GrayText"
          sx={{
            userSelect: 'none',
          }}
        >
          {'Danh sách cán bộ'}
        </CommonTypography>
      </Box>
    </BoxColumnGrabToDrag>
  );
}
export default function OfficerPicker() {
  return (
    <Draggable draggableId={EMPTY_GUID} index={0} isDragDisabled>
      {(provided, _snapshot) => (
        <BoxColumn component={Paper} ref={provided.innerRef} {...provided.draggableProps}>
          <OfficerPickerHeader />
          <OfficerPickerItemList />
        </BoxColumn>
      )}
    </Draggable>
  );
}
