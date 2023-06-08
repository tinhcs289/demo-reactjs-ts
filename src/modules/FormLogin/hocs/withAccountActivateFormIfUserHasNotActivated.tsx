import PATHS from '@/constants/paths';
import wait from '@/functions/wait';
import { AccountActivateDialog } from '@/modules/FormActivateAccount';
import { hasNotBeenActivatedSelector } from '@/redux/userAccount';
import { CommonFormOnClose } from '@/types';
import type { ComponentType } from 'react';
import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import type { FormProps } from '../_types';
function redirectToNextPage(returnUri?: string) {
  if (!(!!window && !!window?.location && typeof window.location.replace === 'function')) return;
  window.location.replace(returnUri || PATHS.dashboard);
}
export default function withAccountActivateFormIfUserHasNotActivated(
  WrappedComponent: ComponentType<FormProps>
) {
  return function FormLoginWithFormActivateAccountIfUserHasNotActivated(props: FormProps) {
    const { returnUri, ...otherProps } = props;
    const hasNotBeenActivated = useSelector(hasNotBeenActivatedSelector);
    const shouldShowWarning = useMemo(() => hasNotBeenActivated === true, [hasNotBeenActivated]);
    const handleClose: CommonFormOnClose = useCallback(
      (args) => {
        if (args?.reason === 'after_success') {
          wait(500).then(() => {
            redirectToNextPage(returnUri);
          });
        }
      },
      [returnUri]
    );
    return (
      <>
        <WrappedComponent returnUri={returnUri} {...otherProps} />
        {shouldShowWarning ? <AccountActivateDialog onClose={handleClose} /> : null}
      </>
    );
  };
}
