import isNotBlankString from '@/helpers/commonHelpers/isNotBlankString';
import usePrevious from '@/hooks/usePrevious';
import useSnackbarNotify from '@/hooks/useSnackbarNotify';
import newMessageSelector from '@/redux/snackbar/selectors/_rootState';
import Slide from '@mui/material/Slide';
import isEqual from 'lodash/isEqual';
import type { SnackbarProviderProps } from 'notistack';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { useSelector } from 'react-redux';

const SnackbarConnect: React.FC<{ children?: React.ReactNode }> = (props) => {
  const { children } = props;

  const newMessage = useSelector(newMessageSelector);
  const preMessage = usePrevious(newMessage);

  const { showNotify } = useSnackbarNotify();

  React.useEffect(() => {
    if (!isEqual(newMessage, preMessage) && isNotBlankString(newMessage?.message)) {
      showNotify(newMessage.variant, newMessage.message as string);
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
