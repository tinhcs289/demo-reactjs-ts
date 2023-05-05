import getGoogleMapApiKey from '@/environments/getGoogleMapApiKey';
import { styled } from '@mui/material';
import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import GoogleMapReact from 'google-map-react';
import { GoogleMapProps } from './_types';
import { useMemo } from 'react';
const BoxStyled = styled(Box)<BoxProps>({
  height: '100%',
  width: '100%',
});
const bootstrapURLKeys = { key: getGoogleMapApiKey() };
export default function GoogleMap(props: GoogleMapProps) {
  const { boxWrapProps, children, defaultCenter, defaultZoom, ...mapProps } = props;
  const $Map = useMemo(() => {
    if (!defaultZoom) return null;
    if (!defaultCenter?.lat || !defaultCenter?.lng) return null;
    return (
      <GoogleMapReact
        bootstrapURLKeys={bootstrapURLKeys}
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom}
        {...mapProps}
      >
        {children}
      </GoogleMapReact>
    );
  }, [defaultCenter, defaultZoom, children, mapProps]);
  return <BoxStyled {...boxWrapProps}>{$Map}</BoxStyled>;
}
