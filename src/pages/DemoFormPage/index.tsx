import DashboardTabsContainer from '@/containers/DashboardTabsContainer';
import ContactForm from '@/modules/ContactForm';
import { defaultContact } from '@/modules/ContactForm/contants';
import { Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import FormByComponents from './FormByComponents';
import FormByConfig from './FormByConfig';
export default function DemoFormPage() {
  return (
    <DashboardTabsContainer>
      <Grid container sx={{ width: '100%' }}>
        <Grid item xs={12} lg={6} container sx={{ mb: 2 }}>
          <Paper elevation={4}>
            <ContactForm defaultValues={defaultContact} resetOnClose />
          </Paper>
        </Grid>
        <Grid item xs={12} container sx={{ mb: 2 }}>
          <Paper elevation={4} sx={{ width: '100%' }}>
            <FormByConfig />
          </Paper>
        </Grid>
        <Grid item xs={12} container sx={{ mb: 2 }}>
          <Paper elevation={4}>
            <FormByComponents />
          </Paper>
        </Grid>
      </Grid>
    </DashboardTabsContainer>
  );
}
