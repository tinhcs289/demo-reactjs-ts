import ShopeeInfiniteList from '@/modules/ShopeeInfiniteList';
import type { FC } from 'react';
import BannerSlider from './components/BannerSlider';
import BottomNavigator from './components/BottomNavigator';
import CategoryList from './components/CategoryList';
import PageContent from './components/PageContent';
import PageTopBar from './components/PageTopBar';
import QuickTools from './components/QuickTools';
import { CategoriesProvider } from './context';

const ShopeePage: FC<any> = () => {
  return (
    <CategoriesProvider>
      <PageTopBar />
      <BannerSlider />
      <QuickTools />
      <CategoryList />
      <PageContent component="main">
        <ShopeeInfiniteList />
      </PageContent>
      <BottomNavigator />
    </CategoriesProvider>
  );
};
export default ShopeePage;
