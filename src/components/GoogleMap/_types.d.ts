import type { BoxProps } from '@mui/material/Box';
import GoogleMapReact from 'google-map-react';
import type { ReactNode } from 'react';
type GoogleMapReactProps = GoogleMapReact.Props;
export type GoogleMapProps = GoogleMapReactProps & {
  boxWrapProps?: BoxProps;
};
export type GoogleMapMarkerProps = {
  lat: number;
  lng: number;
  children?: ReactNode;
};