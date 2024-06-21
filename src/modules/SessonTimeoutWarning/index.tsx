import { ButtonPositive } from '@/components/buttons';
import { CommonDialog } from '@/components/dialogs';
import { CommonTypography } from '@/components/typo';
import PATHS from '@/constants/paths';
import toEncodeUri from '@/helpers/stringHelpers/toEncodeUri';
import useReturnUrlHashBuilder from '@/hooks/useReturnUrlHashBuilder';
import { isSessionTimeoutSelector } from '@/redux/session';
import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
export default function SessonTimeoutWarning() {
  const { buildReturnHash } = useReturnUrlHashBuilder();
  const shouldShowWarning = useSelector(isSessionTimeoutSelector);
  const open = useMemo(() => !!shouldShowWarning, [shouldShowWarning]);
  const redirectToLogin = useCallback(() => {
    const returnHash = buildReturnHash();
    const loginUrl = toEncodeUri(PATHS.login, returnHash);
    window.location.replace(loginUrl);
  }, [buildReturnHash]);
  return (
    <CommonDialog
      open={open}
      title="Phiên làm việc đã hết hạn"
      gridContent
      actions={
        <>
          <ButtonPositive onClick={redirectToLogin}>Đi tới Đăng nhập</ButtonPositive>
        </>
      }
    >
      <CommonTypography>
        Dữ liệu của bạn sẽ bị mất. Vui lòng đăng nhập lại để tiếp tục làm việc
      </CommonTypography>
    </CommonDialog>
  );
}
