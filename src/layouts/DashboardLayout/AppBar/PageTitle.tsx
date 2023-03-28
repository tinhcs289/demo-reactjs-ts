import { useDashboardLayout } from '@/providers/DashboardLayoutProvider';
import Typography from '@mui/material/Typography';
import { useMemo } from 'react';
export default function PageTitle() {
  const [pageTitle] = useDashboardLayout((s) => s.pageTitle);
  const $Title = useMemo(
    () => (
      <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
        {pageTitle}
      </Typography>
    ),
    [pageTitle]
  );
  return $Title;
}
