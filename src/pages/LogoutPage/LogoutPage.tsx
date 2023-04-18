import { LogoutPageProps } from './_types';
import { useEffect } from 'react';
import { CommonFallback } from '@/components/fallback';
export default function LogoutPage(props: LogoutPageProps) {
  const { onLogout } = props;
  useEffect(() => {
    onLogout?.();
  }, [onLogout]);
  return <CommonFallback />;
}
