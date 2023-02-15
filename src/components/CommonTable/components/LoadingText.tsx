import FindInPageIcon from '@mui/icons-material/FindInPage';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

export default function LoadingText(props: { children?: ReactNode }) {
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
}
