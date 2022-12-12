import { useDashboardLayoutContext } from '@/providers/DashboardLayoutProvider';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import { memo, useCallback, useMemo } from 'react';

const PageTitle: FC<any> = (props) => {
  const { layoutState } = useDashboardLayoutContext();

  const getPageTitle = useCallback(() => {
    return layoutState?.getPageTitle?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layoutState?.getPageTitle]);

  const title = useMemo(() => {
    return (
      <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
        {getPageTitle()}
      </Typography>
    );
  }, [getPageTitle]);

  return title;
};
export default memo(PageTitle) as FC<any>;
