import NavLinkNoStyle from '@/components/nav/NavLinkNoStyle';
import CommonImage from '@/components/media/CommonImage';
import PATHS from '@/__examples/constants/paths';
import slugify from '@/helpers/stringHelpers/slugify';
import type { ShopeeCategoryItem } from '@/types/Shopee';
import CategoryButton from './CategoryButton';
import CategoryName from './CategoryName';
export default function CategoryItem(props?: { item?: ShopeeCategoryItem }) {
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
