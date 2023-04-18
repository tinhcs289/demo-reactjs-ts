import { createCellInnerComponent } from '@/components/table';
import images from '@/constants/images';
import momentOrDefault from '@/helpers/formatHelpers/momentOrDefault';
import { styled } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import type { ListProps } from '@mui/material/List';
import List from '@mui/material/List';
import type { ListItemProps } from '@mui/material/ListItem';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { useMemo } from 'react';
import type { RowData } from '../_types';
const ListStyled = styled(List)<ListProps>({
  width: '100%',
  background: 'transparent',
  padding: 0,
});
const ListItemStyled = styled(ListItem)<ListItemProps>({
  background: 'transparent',
  padding: '2px',
});
const CellCreateBy = createCellInnerComponent<RowData>(function CreatedBy(props) {
  const { row } = props;
  const createdDate = useMemo(() => {
    const date = momentOrDefault(row?.createdDate);
    if (!date) return 'thời điểm không xác định';
    return (
      <>
        <b>{date.format('HH:mm')}</b>
        {`,`}&nbsp;{date.format('DD/MM/YYYY')}
      </>
    );
  }, [row?.createdDate]);
  return (
    <ListStyled>
      <ListItemStyled>
        <ListItemAvatar>
          <Avatar src={images.mockAvatar}>{`thuynt@digiticket.vn`[0]}</Avatar>
        </ListItemAvatar>
        <ListItemText
          sx={{ mt: 0, mb: 0 }}
          primary="thuynt@digiticket.vn"
          primaryTypographyProps={{ noWrap: true, sx: { fontWeight: 500 } }}
          secondary={createdDate}
          secondaryTypographyProps={{ noWrap: true }}
        />
      </ListItemStyled>
    </ListStyled>
  );
});
export default CellCreateBy;
