import CommonImage from '@/components/CommonImage';
import NavLinkNoStyle from '@/components/NavLinkNoStyle';
import slugify from '@/helpers/stringHelpers/slugify';
import { TShopeePromoBrandItem } from '@/modules/ShopeeProductList/_types';
import PATHS from '@/routes/paths';
import BrandButton from './BrandButton';
import BrandName from './BrandName';

export default function BrandItem(props?: { item?: TShopeePromoBrandItem }) {
  const { item: shop } = props || {};
  return (
    <NavLinkNoStyle to={`${PATHS.shopee}/shop-promo/${slugify(shop?.promo_text || '')}--${shop?.shopid || ''}`}>
      <BrandButton>
        <CommonImage src={!!shop?.image ? `https://cf.shopee.vn/file/${shop.image}` : ''} height="180px" />
        <BrandName>{shop?.promo_text || ''}</BrandName>
      </BrandButton>
    </NavLinkNoStyle>
  );
}
