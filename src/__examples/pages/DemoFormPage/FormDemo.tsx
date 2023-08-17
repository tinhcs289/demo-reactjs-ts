import wait from '@/helpers/asyncHelpers/wait';
import { lazy } from 'react';
import { H4 } from '@/components/typo';
import Grid from '@mui/material/Grid';
const Form = lazy(() =>
  wait().then(() => import('@/__examples/modules/FormDemo').then((m) => ({ default: m.FormDemo1 })))
);
export default function DemoFormPage() {
  return (
    <>
      <Grid item xs={12} p={1}>
        <H4 id="how-to-create-fields">Form data fields configuration</H4>
      </Grid>
      <Form />
    </>
  );
}
