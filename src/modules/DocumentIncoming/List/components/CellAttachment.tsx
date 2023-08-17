import { createCellInnerComponent, createDetalPanel } from '@/components/table';
import arrayOrEmpty from '@/helpers/formatHelpers/arrayOrEmpty';
import intOrDefault from '@/helpers/formatHelpers/intOrDefault';
import getFileSizeWithUnit from '@/helpers/stringHelpers/getFileSizeWithUnit';
import useDownloadFileToMyDevice from '@/hooks/useDownloadFileToMyDevice';
import type { ArrayElement } from '@/types';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import RemoveIcon from '@mui/icons-material/Remove';
import Badge from '@mui/material/Badge';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import type { MouseEventHandler } from 'react';
import { Fragment, useMemo } from 'react';
import type { RowData } from '../_types';
type TogglerComponent = Parameters<typeof createDetalPanel<RowData>>[0]['toggle'];
const Toggler: TogglerComponent = (props) => {
  const { open, toggle, row } = props;
  const attachments = useMemo(() => arrayOrEmpty(row?.FileDinhKem), [row?.FileDinhKem]);
  const shouldShowToggler = useMemo(() => attachments.length > 0, [attachments.length]);
  const attachmentCount = useMemo(() => attachments.length, [attachments.length]);
  const $Toggler = useMemo(() => {
    if (!shouldShowToggler) return <></>;
    return (
      <Tooltip title={open ? 'Thu gọn' : 'Hiển thị'}>
        <IconButton onClick={toggle}>
          {!open ? (
            <Badge
              color="primary"
              badgeContent={attachmentCount}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <FolderCopyIcon />
            </Badge>
          ) : (
            <RemoveIcon />
          )}
        </IconButton>
      </Tooltip>
    );
  }, [open, toggle, shouldShowToggler, attachmentCount]);
  return $Toggler;
};
type PanelComponent = Parameters<typeof createDetalPanel<RowData>>[0]['panel'];
type Attachment = ArrayElement<NonNullable<Required<RowData>['FileDinhKem']>>;
const Panel: PanelComponent = (props) => {
  const { row, closePanel } = props;
  const attachments = useMemo(() => arrayOrEmpty(row?.FileDinhKem), [row?.FileDinhKem]);
  const { handleDownloadFile, isDownloading, downloadingId } = useDownloadFileToMyDevice();
  const downloadFile =
    (file: Attachment): MouseEventHandler<HTMLButtonElement> =>
    (e) => {
      e?.stopPropagation?.();
      handleDownloadFile({
        fileId: file?.Id,
        from: file?.PathIOC,
        saveAs: file?.Ten,
      }).then((isSuccess) => {
        if (!isSuccess) alert('Không tải được file');
      });
    };
  return (
    <Grid container m={0} p={0} height="fit-content" flexDirection="row" alignItems="flex-start">
      <Grid item container flex={1} pr={2} pl={10}>
        <List dense sx={{ width: '100%' }} disablePadding>
          {attachments.map((file, i) => (
            <Fragment key={file?.Id || i}>
              {i === 0 ? null : <Divider variant="fullWidth" component="li" />}
              <ListItem
                disablePadding
                secondaryAction={
                  <Tooltip title="Tải về">
                    <IconButton edge="end" onClick={downloadFile(file)} disabled={isDownloading}>
                      {isDownloading && downloadingId === file?.Id ? (
                        <CircularProgress color="primary" size="24px" />
                      ) : (
                        <DownloadIcon />
                      )}
                    </IconButton>
                  </Tooltip>
                }
              >
                <ListItemIcon>
                  <FilePresentIcon />
                </ListItemIcon>
                <ListItemText
                  primary={file?.Ten || ''}
                  primaryTypographyProps={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                  secondary={getFileSizeWithUnit(intOrDefault(file?.DungLuong, 0))}
                />
              </ListItem>
            </Fragment>
          ))}
        </List>
      </Grid>
      <Tooltip title="Thu gọn">
        <IconButton onClick={closePanel}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Grid>
  );
};
const CellAttachment = createCellInnerComponent(
  createDetalPanel<RowData>({
    idField: 'Id',
    toggle: Toggler,
    panel: Panel,
  })
);
export default CellAttachment;
