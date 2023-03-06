import wait from '@/functions/wait';
import { AccountActivateDialog } from '@/modules/AccountActivateForm';
import { hasNotBeenActivatedSelector } from '@/redux/userAccount';
import PATHS from '@/routes/paths';
import { TBaseFormOnCloseHandler } from '@/types';
import type { ComponentType } from 'react';
import { useCallback, useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import type { ILoginPageProps } from '../_types';

function redirectToNextPage(returnUri?: string) {
  if (!(!!window && !!window?.location && typeof window.location.replace === 'function')) return;
  window.location.replace(returnUri || PATHS.dashboard);
}
export default function withAccountActivateFormIfUserHasNotActivated(
  WrappedComponent: ComponentType<ILoginPageProps>
) {
  return function (props: ILoginPageProps) {
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
