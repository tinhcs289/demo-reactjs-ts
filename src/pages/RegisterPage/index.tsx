import wait from '@/helpers/asyncHelpers/wait';
import { lazy } from 'react';
const FormHeading = lazy(() => wait().then(() => import('./components/FormHeading')));
const ActionLinks = lazy(() => wait().then(() => import('./components/ActionLinks')));
const FormRegister = lazy(() => wait().then(() => import('@/modules/FormRegister')));
export default function RegisterPage() {
  return (
    <>
      <FormHeading />
      <FormRegister sx={{ mt: '32px' }} />
      <ActionLinks />
    </>
  );
}
