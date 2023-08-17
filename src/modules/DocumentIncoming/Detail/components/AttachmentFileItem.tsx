import { FieldArrayItemProps, useRHFArrayContext } from '@/components/form';
import getFileSizeWithUnit from '@/helpers/stringHelpers/getFileSizeWithUnit';
import DeleteItem from '@mui/icons-material/Delete';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import get from 'lodash/get';
import type { MouseEventHandler } from 'react';
import { useCallback, useMemo } from 'react';
export default function OtherFileItem(props: FieldArrayItemProps) {
  const { item, itemIndex } = props;
  const { remove } = useRHFArrayContext();
  const fileName = useMemo(() => get(item, ['file', 'name'], '') as string, [item]);
  const fileSizeText = useMemo(() => getFileSizeWithUnit(get(item, ['file', 'size'], 0) as number), [item]);
  const handleDelete: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      event?.stopPropagation?.();
      remove(itemIndex);
    },
    [remove, itemIndex]
  );
  return (
    <>
      <Divider variant="fullWidth" component="li" />
      <ListItem
        disablePadding
        secondaryAction={
          <IconButton edge="end" onClick={handleDelete}>
            <DeleteItem />
          </IconButton>
        }
      >
        <ListItemIcon>
          <FilePresentIcon />
        </ListItemIcon>
        <ListItemText primary={fileName} secondary={fileSizeText} />
      </ListItem>
    </>
  );
}
