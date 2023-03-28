import wait from '@/functions/wait';
import { AccountActivateDialog } from '@/modules/AccountActivateForm';
import { hasNotBeenActivatedSelector } from '@/redux/userAccount';
import PATHS from '@/constants/paths';
import { TBaseFormOnCloseHandler } from '@/types';
import type { ComponentType } from 'react';
import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import type { LoginPageProps } from '../_types';
function redirectToNextPage(returnUri?: string) {
  if (!(!!window && !!window?.location && typeof window.location.replace === 'function')) return;
  window.location.replace(returnUri || PATHS.dashboard);
}
export default function withAccountActivateFormIfUserHasNotActivated(
  WrappedComponent: ComponentType<LoginPageProps>
) {
  return function LoginPageWithAccountActivateFormIfUserHasNotActivated(props: LoginPageProps) {
    const { returnUri, ...otherProps } = props;
    const hasNotBeenActivated = useSelector(hasNotBeenActivatedSelector);
    const shouldShowWarning = useMemo(() => hasNotBeenActivated === true, [hasNotBeenActivated]);
    const handleClose: TBaseFormOnCloseHandler = useCallback(
      (args) => {
        if (!!args?.closedAfterSubmitSuccess) {
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
