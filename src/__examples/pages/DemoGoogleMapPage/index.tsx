import { BoxGoogleMapWithDataContext, GoogleMapMarker } from '@/components/box/BoxGoogleMap';
import CommonAvatar from '@/components/media/CommonAvatar';
import images from '@/constants/images';
import wait from '@/helpers/asyncHelpers/wait';
import { lazy } from 'react';
const PageTabsContainer = lazy(() =>
  wait().then(() => import('@/__examples/containers/DemoPageTabsContainers'))
);
const CENTER = {
  lat: 21.043414199999997,
  lng: 105.82113869999999,
};
export default function DemoFormPage() {
  return (
    <PageTabsContainer>
      <BoxGoogleMapWithDataContext defaultCenter={CENTER} defaultZoom={18}>
        <GoogleMapMarker lat={21.043414199999997} lng={105.82113869999999}>
          <CommonAvatar src={images.mockAvatar} style={{ width: '50px', height: '50px' }} />
        </GoogleMapMarker>
      </BoxGoogleMapWithDataContext>
    </PageTabsContainer>
  );
}
