import createFastContext from '@/helpers/contextHelpers/createFastContext';
import type { ComponentType } from 'react';
import BoxGoogleMap from './BoxGoogleMap';
import type { BoxGoogleMapProps, MapContextValues } from './_types';
const {
  Provider: GoogleMapProvider,
  useGetter: useGoogleMapGetState,
  useSetter: useGoogleMapSetState,
  useDefaultPropInit,
} = createFastContext<MapContextValues>({});
export { GoogleMapProvider, useGoogleMapGetState, useGoogleMapSetState };
function GoogleMapStateInit(props: Pick<BoxGoogleMapProps, 'defaultCenter' | 'defaultZoom'>) {
  const { defaultCenter, defaultZoom } = props;
  useDefaultPropInit('zoom', defaultZoom);
  useDefaultPropInit('center', { coords: defaultCenter });
  return <></>;
}
export function withMapContext(
  WrappedComponent: ComponentType<BoxGoogleMapProps>
): ComponentType<BoxGoogleMapProps> {
  return function MapWithDataContext(props: BoxGoogleMapProps) {
    return (
      <GoogleMapProvider>
        <GoogleMapStateInit defaultZoom={props?.defaultZoom} defaultCenter={props?.defaultCenter} />
        <WrappedComponent {...props} />
      </GoogleMapProvider>
    );
  };
}
export const BoxGoogleMapWithDataContext = withMapContext(function MapWithContext(props: BoxGoogleMapProps) {
  const center = useGoogleMapGetState((s) => s.center);
  const zoom = useGoogleMapGetState((s) => s.zoom);
  return <BoxGoogleMap {...props} defaultCenter={center?.coords} defaultZoom={zoom} />;
});
