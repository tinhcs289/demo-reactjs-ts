import CommonImage from '@/components/CommonImage';
import NavLinkNoStyle from '@/components/NavLinkNoStyle';
import slugify from '@/helpers/stringHelpers/slugify';
import { TShopeeCategoryItem } from '@/modules/ShopeeInfiniteList/_types';
import PATHS from '@/routes/paths';
import type { GridProps } from '@mui/material/Grid';
import Grid from '@mui/material/Grid';
import CategoryButton from './CategoryButton';
import CategoryName from './CategoryName';

export default function CategoryItem(props?: Omit<GridProps, 'children'> & { category?: TShopeeCategoryItem }) {
  const { category, ...otherProps } = props || {};
  return (
    <Grid {...otherProps} item container sx={{ p: '1px', height: '50%' }}>
      <Grid item xs={12} sx={{ background: '#efefef', textAlign: 'center' }}>
        <NavLinkNoStyle
          to={`${PATHS.shopee}/danh-muc/${slugify(category?.display_name || '')}--${category?.catid || ''}`}
        >
          <CategoryButton>
            <CommonImage src={!!category?.image ? `https://cf.shopee.vn/file/${category.image}` : ''} height="36px" />
            <CategoryName>{category?.display_name || ''}</CategoryName>
          </CategoryButton>
        </NavLinkNoStyle>
      </Grid>
    </Grid>
  );
}
