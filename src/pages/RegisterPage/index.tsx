import wait from '@/functions/wait';
import { lazy } from 'react';
const FormHeading = lazy(() => wait(0).then(() => import('./components/FormHeading')));
const ActionLinks = lazy(() => wait(0).then(() => import('./components/ActionLinks')));
const FormRegister = lazy(() => wait(0).then(() => import('@/modules/FormRegister')));
export default function RegisterPage() {
  return (
    <>
      <FormHeading />
      <FormRegister sx={{ mt: '32px' }} />
      <ActionLinks />
    </>
  );
}
