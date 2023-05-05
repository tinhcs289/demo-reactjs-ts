import createFastContext from '@/functions/createFastContext';
import type { ComponentType } from 'react';
import GoogleMap from './GoogleMap';
import type { GoogleMapProps, MapContextValues } from './_types';
const {
  Provider: GoogleMapProvider,
  useGetter: useGoogleMapGetState,
  useSetter: useGoogleMapSetState,
  useDefaultPropInit,
} = createFastContext<MapContextValues>({});
export { GoogleMapProvider, useGoogleMapGetState, useGoogleMapSetState };
function GoogleMapStateInit(props: Pick<GoogleMapProps, 'defaultCenter' | 'defaultZoom'>) {
  const { defaultCenter, defaultZoom } = props;
  useDefaultPropInit('zoom', defaultZoom);
  useDefaultPropInit('center', { coords: defaultCenter });
  return <></>;
}
export function withMapContext(
  WrappedComponent: ComponentType<GoogleMapProps>
): ComponentType<GoogleMapProps> {
  return function MapWithDataContext(props: GoogleMapProps) {
    return (
      <GoogleMapProvider>
        <GoogleMapStateInit defaultZoom={props?.defaultZoom} defaultCenter={props?.defaultCenter} />
        <WrappedComponent {...props} />
      </GoogleMapProvider>
    );
  };
}
export const GoogleMapWithDataContext = withMapContext(function MapWithContext(props: GoogleMapProps) {
  const center = useGoogleMapGetState((s) => s.center);
  const zoom = useGoogleMapGetState((s) => s.zoom);
  return <GoogleMap {...props} defaultCenter={center?.coords} defaultZoom={zoom} />;
});
