import { CommonDialog } from '@/components/dialogs';
import type { CommonDialogOnClose } from '@/components/dialogs';
import { REGEX_EMAIL, REGEX_PHONE } from '@/constants/regex';
import { accoutNeedToBeActivatedSelector, actions } from '@/redux/userAccount';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { ComponentType } from 'react';
import type { FormProps } from '../_types';
function ActivatingRequiredAlert() {
  const accoutNeedToBeActivated = useSelector(accoutNeedToBeActivatedSelector);
  const contactType = useMemo(() => {
    if (!accoutNeedToBeActivated) return undefined;
    if (REGEX_EMAIL.test(accoutNeedToBeActivated)) return 'email';
    if (REGEX_PHONE.test(accoutNeedToBeActivated)) return 'phone';
    return undefined;
  }, [accoutNeedToBeActivated]);
  return (
    <Alert severity="error" sx={{ mb: 2 }}>
      <AlertTitle>{'Tài khoản chưa được kích hoạt'}</AlertTitle>
      {'Mã xác nhận đã được gửi'}
      {contactType === 'email' ? ' tới địa chỉ email' : ''}
      {contactType === 'phone' ? ' dưới dạng SMS tới số điện thoại' : ''}
      &nbsp;
      <b>{accoutNeedToBeActivated}</b>
      {'. Vui lòng kiểm tra và thực hiện kích hoạt tài khoản.'}
    </Alert>
  );
}
function ButtonReSentOtp() {
  return (
    <Box sx={{ width: '100%', mb: 2, textAlign: 'right' }}>
      <Button color="primary" size="small">
        {`Không nhận được mã? Gửi lại`}
      </Button>
    </Box>
  );
}
export default function withDisplayAsDialog(
  WrappedComponent: ComponentType<FormProps>
): ComponentType<FormProps> {
  return function FormWithDisplayAsDialog(props: FormProps) {
    const { loading, onClose, ...otherProps } = props;
    const dispatch = useDispatch();
    const handleDialogClose: CommonDialogOnClose = useCallback(
      (event, reason) => {
        if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
          dispatch(actions.unMarkAsNotBeenActivated({}));
        }
        onClose?.();
      },
      [dispatch, onClose]
    );
    return (
      <CommonDialog open onClose={handleDialogClose} loading={loading} title="Kích hoạt tài khoản">
        <ActivatingRequiredAlert />
        <ButtonReSentOtp />
        <Box sx={{ width: '100%', mb: 2 }}>
          <Divider />
        </Box>
        <WrappedComponent {...otherProps} />
      </CommonDialog>
    );
  };
}
