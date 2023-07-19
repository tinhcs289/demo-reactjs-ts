import { AnyObject } from '@/types';
import type { BoxProps } from '@mui/material/Box';
import GoogleMapReact from 'google-map-react';
import type { ReactNode } from 'react';
type GoogleMapReactProps = GoogleMapReact.Props;
export type GoogleMapProps = GoogleMapReactProps & {
  boxWrapProps?: BoxProps;
};
export type GoogleMapMarkerProps = GoogleMapReact.Coords & {
  children?: ReactNode;
};
export type GoogleMapPoint = { coords?: GoogleMapReact.Coords; data?: AnyObject };
export type MapContextValues = {
  center?: GoogleMapPoint;
  markers?: GoogleMapPoint[];
  zoom?: number;
};
