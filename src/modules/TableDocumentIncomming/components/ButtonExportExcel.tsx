import { ButtonPositive } from '@/components/buttons';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useCallback, useMemo } from 'react';
import { useAsyncListAction, useAsyncListGetter } from '../context';
export default function ButtonExportExcel() {
  const selectable = useAsyncListGetter((s) => s?.selectable);
  const items = useAsyncListGetter((s) => s?.selectedItems);
  const selectCount = useMemo(() => items?.length || 0, [items?.length]);
  const { toggleSelectable } = useAsyncListAction();
  const handleClick = useCallback(() => {
    toggleSelectable?.(!selectable);
  }, [toggleSelectable, selectable]);
  return (
    <ButtonPositive startIcon={<FileDownloadIcon />} onClick={handleClick}>
      {!selectCount ? 'Xuất dữ liệu' : `Xuất dữ liệu (${selectCount})`}
    </ButtonPositive>
  );
}
