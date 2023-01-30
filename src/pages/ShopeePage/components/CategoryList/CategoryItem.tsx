import CommonImage from '@/components/CommonImage';
import NavLinkNoStyle from '@/components/NavLinkNoStyle';
import slugify from '@/helpers/stringHelpers/slugify';
import { TShopeeCategoryItem } from '@/modules/ShopeeProductList/_types';
import PATHS from '@/routes/paths';
import CategoryButton from './CategoryButton';
import CategoryName from './CategoryName';

export default function CategoryItem(props?: { item?: TShopeeCategoryItem }) {
  const { item: category } = props || {};
  return (
    <NavLinkNoStyle
      to={`${PATHS.shopee}/danh-muc/${slugify(category?.display_name || '')}--${category?.catid || ''}`}
    >
      <CategoryButton>
        <CommonImage
          src={!!category?.image ? `https://cf.shopee.vn/file/${category.image}` : ''}
          height="36px"
        />
        <CategoryName>{category?.display_name || ''}</CategoryName>
      </CategoryButton>
    </NavLinkNoStyle>
  );
}
