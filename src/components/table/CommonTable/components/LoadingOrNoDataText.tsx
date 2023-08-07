import FindInPageIcon from '@mui/icons-material/FindInPage';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { selectTableContext } from '../context';
function LoadingText(props: { children?: ReactNode }) {
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
function NoDataText(props: { children?: ReactNode }) {
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
export default function LoadingOrNoDataText(props: { loadingText?: ReactNode; noDataText?: ReactNode }) {
  const { loadingText, noDataText } = props;
  const isLoading = selectTableContext((s) => s?.isLoading);
  const totalOfRows = selectTableContext((s) => s?.totalOfRows);
  const totalOfCells = selectTableContext((s) => s?.totalOfCells);
  const $loadingOrNoDataText = useMemo(() => {
    if (!!isLoading) return <LoadingText>{loadingText}</LoadingText>;
    return <NoDataText>{noDataText}</NoDataText>;
  }, [isLoading, loadingText, noDataText]);
  const $noDataOrLoading = useMemo(() => {
    if (totalOfRows > 0) return null;
    return (
      <TableRow>
        <TableCell colSpan={totalOfCells}>{$loadingOrNoDataText}</TableCell>
      </TableRow>
    );
  }, [totalOfRows, totalOfCells, $loadingOrNoDataText]);
  return $noDataOrLoading;
}
