import type { ButtonCommonProps } from '@/components/buttons';
import { ButtonPositive } from '@/components/buttons';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import { useCallback } from 'react';
export default function ButtonOCR() {
  const handleClick: Required<ButtonCommonProps>['onClick'] = useCallback((event) => {
    event?.stopPropagation?.();
  }, []);
  return (
    <ButtonPositive startIcon={<DocumentScannerIcon />} onClick={handleClick} noWrap>
      {`Nhận dạng văn bản (OCR)`}
    </ButtonPositive>
  );
}
