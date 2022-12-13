import { useDashboardLayout } from '@/providers/DashboardLayoutProvider';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import { memo, useMemo } from 'react';

const PageTitle: FC<any> = (props) => {
  const [pageTitle] = useDashboardLayout((s) => s.pageTitle);

  const title = useMemo(() => {
    return (
      <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
        {pageTitle}
      </Typography>
    );
  }, [pageTitle]);

  return title;
};
export default memo(PageTitle) as FC<any>;
