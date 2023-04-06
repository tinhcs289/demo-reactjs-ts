import NavLinkNoStyle from '@/components/NavLinkNoStyle';
import TypographyLimitLines from '@/components/typo/TypographyLimitLines';
import PATHS from '@/constants/paths';
import slugify from '@/helpers/stringHelpers/slugify';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import numeral from 'numeral';
import { useMemo } from 'react';
import { generatePath } from 'react-router';
import type { TShopeeProductItem } from '../_types';
import { PRODUCT_IMAGE_HEIGHT } from '../constants';
import useItemFlagSet from '../hooks/useItemFlagSet';
import useItemOverlaySet from '../hooks/useItemOverlaySet';
import useItemPromoLabelSet from '../hooks/useItemPromoLabelSet';
import LabelDiscount from './LabelDiscount';
import { LabelTextGroup, LabelVoucher } from './LabelText';
import ProductItemCard from './ProductItemCard';
import ProductItemFindSimilar from './ProductItemFindSimilar';
import ProductItemGrid from './ProductItemGrid';

function useMemoDisplay(product: TShopeeProductItem) {
  const $productName = useMemo(() => {
    return (
      <TypographyLimitLines variant="h5" fontSize="small" maxLines={2} fontWeight={500}>
        {product?.name || ''}
      </TypographyLimitLines>
    );
  }, [product?.name]);

  const $discoundLabel = useMemo(() => {
    if (!product.discount) return null;
    return <LabelDiscount discount={product.discount} />;
  }, [product?.discount]);

  const $productImage = useMemo(() => {
    return (
      <CardMedia
        sx={{ height: PRODUCT_IMAGE_HEIGHT }}
        image={`https://cf.shopee.vn/file/${product?.image}`}
        title={product?.name}
      />
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

  const $voucherInfo = useMemo(() => {
    if (!product?.voucher_info?.label) return null;
    return <LabelVoucher>{product.voucher_info.label}</LabelVoucher>;
  }, [product?.voucher_info?.label]);

  const { $overlayImage } = useItemOverlaySet(product);
  const { $promoLabelSet } = useItemPromoLabelSet(product);
  const { $imageFlagSet } = useItemFlagSet(product);

  return {
    $productName,
    $productImage,
    $productPrice,
    $productHistorySold,
    $discoundLabel,
    $voucherInfo,
    $overlayImage,
    $promoLabelSet,
    $imageFlagSet,
  };
}

export default function ProductItem(props: { product: TShopeeProductItem }) {
  const product = useMemo(() => props?.product, [props?.product]);

  const productUrl = useMemo(
    () =>
      generatePath(PATHS.shopeeProductDetail, {
        productName: slugify(product?.name || ''),
        productId: product?.itemid || '',
      }),
    [product?.name, product?.itemid]
  );

  const {
    $productName,
    $productImage,
    $productPrice,
    $productHistorySold,
    $discoundLabel,
    $voucherInfo,
    $overlayImage,
    $promoLabelSet,
    $imageFlagSet,
  } = useMemoDisplay(product);

  return (
    <ProductItemGrid>
      <NavLinkNoStyle to={productUrl}>
        <ProductItemCard>
          {$discoundLabel}
          {$overlayImage}
          {$imageFlagSet}
          {$productImage}
          <CardContent sx={{ padding: '8px 8px 0 8px' }}>
            {$productName}
            <LabelTextGroup>
              {$voucherInfo}
              {$promoLabelSet}
            </LabelTextGroup>
          </CardContent>
          <CardActions sx={{ justifyContent: 'space-between' }}>
            {$productPrice}
            {$productHistorySold}
          </CardActions>
          <ProductItemFindSimilar />
        </ProductItemCard>
      </NavLinkNoStyle>
    </ProductItemGrid>
  );
}
