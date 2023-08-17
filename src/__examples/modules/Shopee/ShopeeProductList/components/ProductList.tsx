import { EApiRequestStatus } from '@/constants/apiRequestStatus';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import { useMemo } from 'react';
import { useAsyncListGetter } from '../context';
import ProductItem from './ProductItem';
import ProductListLoading from './ProductListLoading';
export default function ProductList() {
  const data = useAsyncListGetter((s) => s?.dataInPage);
  const fetchStatus = useAsyncListGetter((s) => s.fetchStatus);
  const isLoading = useMemo(() => fetchStatus === EApiRequestStatus.REQUESTING, [fetchStatus]);
  const $loadingBar = useMemo(
    () => (isLoading ? <LinearProgress sx={{ position: 'absolute', width: '100%' }} /> : null),
    [isLoading]
  );
  const $list = useMemo(() => {
    if (!Array.isArray(data) || data.length === 0) return <ProductListLoading />;
    return data.map((product) => <ProductItem key={product.itemid} product={product} />);
  }, [data]);
  return (
    <Grid container sx={{ position: 'relative' }}>
      {$loadingBar}
      {$list}
    </Grid>
  );
}
