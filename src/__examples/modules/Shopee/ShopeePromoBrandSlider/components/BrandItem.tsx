import NavLinkNoStyle from '@/components/nav/NavLinkNoStyle';
import CommonImage from '@/components/media/CommonImage';
import PATHS from '@/__examples/constants/paths';
import slugify from '@/helpers/stringHelpers/slugify';
import type { ShopeePromoBrandItem } from '@/types/Shopee';
import BrandButton from './BrandButton';
import BrandName from './BrandName';
export default function BrandItem(props?: { item?: ShopeePromoBrandItem }) {
  const { item: shop } = props || {};
  return (
    <NavLinkNoStyle
      to={`${PATHS.shopee}/shop-promo/${slugify(shop?.promo_text || '')}--${shop?.shopid || ''}`}
    >
      <BrandButton>
        <CommonImage src={!!shop?.image ? `https://cf.shopee.vn/file/${shop.image}` : ''} height="180px" />
        <BrandName>{shop?.promo_text || ''}</BrandName>
      </BrandButton>
    </NavLinkNoStyle>
  );
}
