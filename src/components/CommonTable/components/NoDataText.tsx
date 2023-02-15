import SearchOffIcon from '@mui/icons-material/SearchOff';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

export default function NoDataText(props: { children?: ReactNode }) {
  const { children } = props;
  const { t } = useTranslation();
  if (!children)
    return (
      <Typography sx={{ display: 'flex', justifyContent: 'center' }}>
        <SearchOffIcon />
        &nbsp;{t('common:table.noDataFound')}
      </Typography>
    );
  return <>{children}</>;
}
