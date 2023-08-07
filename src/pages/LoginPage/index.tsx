import wait from '@/helpers/asyncHelpers/wait';
import { lazy } from 'react';
const FormHeading = lazy(() => wait().then(() => import('./components/FormHeading')));
const ActionLinks = lazy(() => wait().then(() => import('./components/ActionLinks')));
const FormLogin = lazy(() => wait().then(() => import('@/modules/FormLogin')));
export default function LoginPage() {
  return (
    <>
      <FormHeading />
      <FormLogin sx={{ mt: '32px' }} />
      <ActionLinks />
    </>
  );
}
