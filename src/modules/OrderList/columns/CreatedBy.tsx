import type { TBodyCellInnerComponent } from '@/components/CommonTable/_types';
import type { TAny } from '@/_types/TAny';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import type { TOrderListItem } from '../_types';
import { useMemo } from 'react';
import momentOrDefault from '@/helpers/formatHelpers/momentOrDefault';

const CreatedBy: TBodyCellInnerComponent<TOrderListItem, TAny> = ({ row }) => {
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
    <List sx={{ width: '100%', background: 'transparent', padding: 0 }}>
      <ListItem sx={{ background: 'transparent', padding: '2px' }}>
        <ListItemAvatar>
          <Avatar src="https://toquoc.mediacdn.vn/280518851207290880/2021/3/14/15253497622933892974712405640560402592920124o-1615731932782980896116.jpeg">
            {`thuynt@digiticket.vn`[0]}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          sx={{ mt: 0, mb: 0 }}
          primary="thuynt@digiticket.vn"
          primaryTypographyProps={{ noWrap: true, sx: { fontWeight: 500 } }}
          secondary={createdDate}
          secondaryTypographyProps={{ noWrap: true }}
        />
      </ListItem>
    </List>
  );
};
export default CreatedBy;
