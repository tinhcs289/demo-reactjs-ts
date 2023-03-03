import DashboardTabsContainer from '@/containers/DashboardTabsContainer';
import BannerSlider from '@/pages/ShopeePage/components/BannerSlider';
import CategoryList from '@/pages/ShopeePage/components/CategoryList';
import PromoBrandList from '@/pages/ShopeePage/components/PromoBrandList';
import QuickTools from '@/pages/ShopeePage/components/QuickTools';
import CategoriesProvider from '@/pages/ShopeePage/context/CategoriesProvider';
import PromoBrandsProvider from '@/pages/ShopeePage/context/PromoBrandsProvider';

export default function DemoCarouselPage() {
  return (
    <DashboardTabsContainer>
      <BannerSlider />
      <QuickTools />
      <PromoBrandsProvider>
        <PromoBrandList />
      </PromoBrandsProvider>
      <CategoriesProvider>
        <CategoryList />
      </CategoriesProvider>
    </DashboardTabsContainer>
  );
}
