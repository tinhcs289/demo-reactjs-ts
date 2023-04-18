import wait from '@/functions/wait';
import { lazy } from 'react';
const FormHeading = lazy(() => wait(0).then(() => import('./components/FormHeading')));
const ActionLinks = lazy(() => wait(0).then(() => import('./components/ActionLinks')));
const FormLogin = lazy(() => wait(0).then(() => import('@/modules/FormLogin')));
export default function LoginPage() {
  return (
    <>
      <FormHeading />
      <FormLogin sx={{ mt: '32px' }} />
      <ActionLinks />
    </>
  );
}
