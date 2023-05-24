import { SNACKBAR_VARIANT } from '@/constants/snackbar';
import isNotBlankString from '@/helpers/commonHelpers/isNotBlankString';
import usePrevious from '@/hooks/usePrevious';
import useSnackbarNotify from '@/hooks/useSnackbarNotify';
import { rootSelector as snackbarSelector } from '@/redux/snackbar';
import Slide from '@mui/material/Slide';
import isEqual from 'lodash/isEqual';
import type { SnackbarProviderProps } from 'notistack';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { useSelector } from 'react-redux';
function SnackbarConnect() {
  const newMessage = useSelector(snackbarSelector);
  const preMessage = usePrevious(newMessage);
  const { showNotify } = useSnackbarNotify();
  React.useEffect(() => {
    if (!isEqual(newMessage, preMessage) && isNotBlankString(newMessage?.message)) {
      showNotify(newMessage?.variant || SNACKBAR_VARIANT.DEFAULT, newMessage?.message || '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newMessage]);
  React.useEffect(() => {
    function networkDownListener() {
      if (!navigator || typeof navigator?.onLine !== 'boolean') return;
      if (!navigator.onLine) {
        showNotify('error', 'Mất kết nối! hãy kiểm tra lại cài đặt Internet');
        return;
      }
    }
    document.addEventListener('DOMContentLoaded', networkDownListener);
    return function () {
      window.removeEventListener('DOMContentLoaded', networkDownListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
}
export default function NotiStackProvider(props: SnackbarProviderProps) {
  const { children, ...otherProps } = props;
  return (
    <SnackbarProvider
      dense
      preventDuplicate
      maxSnack={20}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      TransitionComponent={Slide}
      {...otherProps}
    >
      <SnackbarConnect />
      {children}
    </SnackbarProvider>
  );
}
