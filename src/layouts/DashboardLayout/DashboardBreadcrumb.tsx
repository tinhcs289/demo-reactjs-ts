import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
const breadcrumbs = [
  <Link underline="hover" key="1" color="inherit" href="/" noWrap>
    BreadcrumbBreadcrumbBreadcrumbBreadcrumbBreadcrumbBreadcrumb
  </Link>,
  <Link underline="hover" key="2" color="inherit" href="/" noWrap>
    CorBreadcrumbBreadcrumbBreadcrumbBreadcrumbBreadcrumbBreadcrumbe
  </Link>,
  <Typography key="3" color="text.primary" noWrap>
    BreadcrumbBreadcrumbBreadcrumbBreadcrumbBreadcrumbBreadcrumbBreadcrumb
  </Typography>,
];
export default function DashboardBreadcrumb() {
  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Breadcrumbs maxItems={2} separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
    </Box>
  );
}
