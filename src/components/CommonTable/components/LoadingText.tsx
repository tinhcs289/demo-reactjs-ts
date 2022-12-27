import FindInPageIcon from '@mui/icons-material/FindInPage';
import Typography from '@mui/material/Typography';
import type { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

const LoadingText: FC<{ children?: ReactNode }> = (props) => {
  const { children } = props;
  const { t } = useTranslation();
  if (!children)
    return (
      <Typography sx={{ display: 'flex', justifyContent: 'center' }}>
        <FindInPageIcon />
        &nbsp;{t('common:table.loading')}
      </Typography>
    );
  return <>{children}</>;
};
export default LoadingText;
