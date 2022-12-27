import SearchOffIcon from '@mui/icons-material/SearchOff';
import Typography from '@mui/material/Typography';
import type { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

const NoDataText: FC<{ children?: ReactNode }> = (props) => {
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
};
export default NoDataText;
