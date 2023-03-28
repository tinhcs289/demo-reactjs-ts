import NavLinkNoStyle from '@/components/NavLinkNoStyle';
import PATHS from '@/constants/paths';
import { DashboardPageContainer } from '@/layouts/DashboardLayout';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DevelopBackground from './DevelopBackground';
export default function InDevelopPage() {
  return (
    <DashboardPageContainer>
      <Grid container>
        <Grid item xs={12} textAlign="center" sx={{ my: 4 }}>
          <Typography variant="h4">{`Chức năng đang trong quá trình phát triển`}</Typography>
        </Grid>
        <Grid item xs={12} textAlign="center" sx={{ mb: 2 }}>
          <Typography color="GrayText">{`Vui lòng quay lại sau để trải nghiệm`}</Typography>
        </Grid>
        <Grid item xs={12} textAlign="center">
          <NavLinkNoStyle to={PATHS.dashboard}>
            <Button color="primary" variant="contained">{`Quay về trang chủ`}</Button>
          </NavLinkNoStyle>
        </Grid>
        <Grid item xs={12} sx={{ '& svg': { maxHeight: '400px', maxWidth: '100%' } }}>
          <DevelopBackground />
        </Grid>
      </Grid>
    </DashboardPageContainer>
  );
}
