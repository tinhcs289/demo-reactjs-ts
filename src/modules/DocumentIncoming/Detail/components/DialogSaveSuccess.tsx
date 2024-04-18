import { CommonDialog } from '@/components/dialogs';
import { CommonTypography, H1 } from '@/components/typo';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { ButtonNegative, ButtonPositive } from '@/components/buttons';
export default function DialogSaveSuccess(props: {
  open: boolean;
  onClose?: () => void;
  onContinueAssign?: () => void;
  onContinueRequestSign?: () => void;
}) {
  return (
    <CommonDialog open={!!props?.open} gridContent={false}>
      <DialogTitle>Tạo mới thành công</DialogTitle>
      <DialogContent>
        <CommonTypography textAlign="center">Văn bản được cấp số tự động</CommonTypography>
        <H1 textAlign="center" fontWeight={700}>
          45
        </H1>
      </DialogContent>
      <DialogActions>
        {/* <ButtonPositive
          onClick={(e) => {
            e?.stopPropagation?.();
            props?.onContinueAssign?.();
          }}
        >
          {'Phân xử lý'}
        </ButtonPositive> */}
        <ButtonPositive
          onClick={(e) => {
            e?.stopPropagation?.();
            props?.onContinueRequestSign?.();
          }}
        >
          {'Trình ký'}
        </ButtonPositive>
        <ButtonNegative
          onClick={(e) => {
            e?.stopPropagation?.();
            props?.onClose?.();
          }}
        >
          {'Đóng'}
        </ButtonNegative>
      </DialogActions>
    </CommonDialog>
  );
}
