import type { FieldArrayComponentProps } from '@/components/form';
import { FieldArrayItemProps, useRHFArrayContext } from '@/components/form';
import getFileSizeWithUnit from '@/helpers/stringHelpers/getFileSizeWithUnit';
import { FileData } from '@/types';
import DeleteItem from '@mui/icons-material/Delete';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import get from 'lodash/get';
import type { MouseEventHandler } from 'react';
import { useCallback, useMemo } from 'react';
function FileList(props: FieldArrayComponentProps<FileData>) {
  const { name, fields: fieldsSub, itemComponent: ItemComponent } = props;
  const { fields: fieldArray } = useRHFArrayContext<FileData>();
  if (!ItemComponent) return null;
  return (
    <List dense sx={{ width: '100%' }}>
      {fieldArray.map((item: FileData, index) => (
        <ItemComponent
          key={item.id}
          rootName={name}
          item={item}
          itemIndex={index}
          itemName={`${name}.${index}`}
          subFields={fieldsSub}
        />
      ))}
    </List>
  );
}
function FileItem(props: FieldArrayItemProps<FileData>) {
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
const AttachmentFile = {
  FileList,
  FileItem,
};
export default AttachmentFile;
