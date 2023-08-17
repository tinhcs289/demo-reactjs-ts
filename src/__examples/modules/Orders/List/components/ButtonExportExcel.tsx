import { ButtonPositive } from '@/components/buttons';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useCallback, useMemo } from 'react';
import { useAsyncListAction, useAsyncListGetter } from '../context';
export default function ButtonExportExcel() {
  const items = useAsyncListGetter((s) => s?.selectedItems);
  const selectCount = useMemo(() => items?.length || 0, [items?.length]);
  const disabled = useMemo(() => selectCount === 0, [selectCount]);
  const { checkAll } = useAsyncListAction();
  const handleClick = useCallback(() => {
    checkAll?.(false);
  }, [checkAll]);
  return (
    <ButtonPositive
      disabled={disabled}
      color="info"
      startIcon={<FileDownloadIcon />}
      onClick={handleClick}
      noWrap
    >
      {!selectCount ? 'Xuất dữ liệu' : `Xuất dữ liệu (${selectCount})`}
    </ButtonPositive>
  );
}
