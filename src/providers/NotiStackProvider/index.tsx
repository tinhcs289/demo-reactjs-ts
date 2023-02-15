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

const SnackbarConnect: React.FC<{ children?: React.ReactNode }> = (props) => {
  const { children } = props;

  const newMessage = useSelector(snackbarSelector);
  const preMessage = usePrevious(newMessage);

  const { showNotify } = useSnackbarNotify();

  React.useEffect(() => {
    if (!isEqual(newMessage, preMessage) && isNotBlankString(newMessage?.message)) {
      showNotify(newMessage?.variant || SNACKBAR_VARIANT.DEFAULT, newMessage?.message || '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newMessage]);

  const memoChildren = React.useMemo(() => {
    return <>{children}</>;
  }, [children]);

  return <>{memoChildren}</>;
};

const NotiStackProvider: React.FC<SnackbarProviderProps> = (props) => {
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
      <SnackbarConnect>{children}</SnackbarConnect>
    </SnackbarProvider>
  );
};
export default NotiStackProvider;
