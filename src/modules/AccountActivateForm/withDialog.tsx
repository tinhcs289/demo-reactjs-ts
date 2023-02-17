import CommonDialog from '@/components/CommonDialog';
import { REGEX_EMAIL, REGEX_PHONE } from '@/constants/regex';
import { accoutNeedToBeActivatedSelector, actions } from '@/redux/userAccount';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { FormType } from './_types';
export default function withDialog(WrappedComponent: FormType): FormType {
  return function (props) {
    const { loading, onClose, ...otherProps } = props;
    const accoutNeedToBeActivated = useSelector(accoutNeedToBeActivatedSelector);
    const dispatch = useDispatch();
    const contactType = useMemo(() => {
      if (!accoutNeedToBeActivated) return undefined;
      if (REGEX_EMAIL.test(accoutNeedToBeActivated)) return 'email';
      if (REGEX_PHONE.test(accoutNeedToBeActivated)) return 'phone';
      return undefined;
    }, [accoutNeedToBeActivated]);
    const handleClose = useCallback(() => {
      dispatch(actions.unMarkAsNotBeenActivated({}));
      onClose?.();
    }, [dispatch, onClose]);
    return (
      <CommonDialog open onClose={handleClose} loading={loading} title="Kích hoạt tài khoản">
        <Alert severity="error" sx={{ mb: 2 }}>
          <AlertTitle>{'Tài khoản chưa được kích hoạt'}</AlertTitle>
          {'Mã xác nhận đã được gửi'}
          {contactType === 'email' ? ' tới địa chỉ email' : ''}
          {contactType === 'phone' ? ' dưới dạng SMS tới số điện thoại' : ''}
          &nbsp;
          <b>{accoutNeedToBeActivated}</b>
          {'. Vui lòng kiểm tra và thực hiện kích hoạt tài khoản.'}
        </Alert>
        <Box sx={{ width: '100%', mb: 2, textAlign: 'right' }}>
          <Button color="primary" size="small">
            {`Không nhận được mã? Gửi lại`}
          </Button>
        </Box>
        <Box sx={{ width: '100%', mb: 2 }}>
          <Divider />
        </Box>
        <WrappedComponent {...otherProps} />
      </CommonDialog>
    );
  };
}
