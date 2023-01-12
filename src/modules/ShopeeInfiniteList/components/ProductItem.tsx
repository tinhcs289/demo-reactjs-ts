import NavLinkNoStyle from '@/components/NavLinkNoStyle';
import slugify from '@/helpers/stringHelpers/slugify';
import type { TShopeeProductItem } from '@/modules/ShopeeInfiniteList/_types';
import PATHS from '@/routes/paths';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import numeral from 'numeral';
import { useMemo } from 'react';
import CardProduct from './CardProduct';
import DiscountLabel from './DiscountLabel';
import ProductItemGrid from './ProductItemGrid';
import ProductName from './ProductName';

export default function ProductItem(props: { product: TShopeeProductItem }) {
  const product = useMemo(() => props?.product, [props?.product]);

  const $productName = useMemo(() => {
    return (
      <ProductName variant="h5" fontSize="small">
        {product?.name || ''}
      </ProductName>
    );
  }, [product?.name]);

  const productUrl = useMemo(
    () => `${PATHS.shopee}/san-pham/${slugify(product?.name || '')}--${product?.itemid || ''}`,
    [product?.name, product?.itemid],
  );

  const $discoundLabel = useMemo(() => {
    if (!product.discount) return null;
    return <DiscountLabel discount={product.discount} />;
  }, [product?.discount]);

  const $productImage = useMemo(() => {
    return (
      <CardMedia sx={{ height: 190 }} image={`https://cf.shopee.vn/file/${product?.image}`} title={product?.name} />
    );
  }, [product?.name, product?.image]);

  const $productPrice = useMemo(() => {
    return (
      <Typography fontSize="small" color="primary">
        <b>{numeral((product?.price || 0) / 100000).format('0,0[.]00$')}</b>
      </Typography>
    );
  }, [product?.price]);

  const $productHistorySold = useMemo(() => {
    return (
      <Typography fontSize="small" color="GrayText">
        {!!product?.historical_sold ? `Đã bán ${numeral(product.historical_sold).format('0a')}` : ''}
      </Typography>
    );
  }, [product?.historical_sold]);

  return (
    <ProductItemGrid>
      <NavLinkNoStyle to={productUrl}>
        <CardProduct>
          {$discoundLabel}
          {$productImage}
          <CardContent sx={{ p: '8px' }}>{$productName}</CardContent>
          <CardActions sx={{ justifyContent: 'space-between' }}>
            {$productPrice}
            {$productHistorySold}
          </CardActions>
        </CardProduct>
      </NavLinkNoStyle>
    </ProductItemGrid>
  );
}
