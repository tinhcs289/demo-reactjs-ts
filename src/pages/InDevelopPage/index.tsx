import { ButtonLink } from '@/components/buttons';
import { GridContainer, GridItem } from '@/components/grid';
import PATHS from '@/constants/paths';
import { DashboardPageContainer } from '@/layouts/DashboardLayout';
import Typography from '@mui/material/Typography';
import DevelopBackground from './components/DevelopBackground';
export default function InDevelopPage() {
  return (
    <DashboardPageContainer>
      <GridContainer sx={{ p: 2 }}>
        <GridItem contentProps={{ justifyContent: 'center' }} sx={{ my: 4 }}>
          <Typography variant="h4">{`Chức năng đang trong quá trình phát triển`}</Typography>
        </GridItem>
        <GridItem contentProps={{ justifyContent: 'center' }} sx={{ mb: 2 }}>
          <Typography color="GrayText">{`Vui lòng quay lại sau để trải nghiệm`}</Typography>
        </GridItem>
        <GridItem contentProps={{ justifyContent: 'center' }}>
          <ButtonLink to={PATHS.dashboard} variant="contained">{`Quay về trang chủ`}</ButtonLink>
        </GridItem>
        <GridItem
          contentProps={{ justifyContent: 'center' }}
          sx={{ '& svg': { maxHeight: '400px', maxWidth: '100%' } }}
        >
          <DevelopBackground />
        </GridItem>
      </GridContainer>
    </DashboardPageContainer>
  );
}
