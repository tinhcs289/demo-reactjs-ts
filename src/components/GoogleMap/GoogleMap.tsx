import getGoogleMapApiKey from '@/environments/getGoogleMapApiKey';
import { styled } from '@mui/material';
import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import GoogleMapReact from 'google-map-react';
import { GoogleMapProps } from './_types';
import { defaultProps } from './constants';
const BoxStyled = styled(Box)<BoxProps>({
  height: '100%',
  width: '100%',
});
const bootstrapURLKeys = { key: getGoogleMapApiKey() };
export default function GoogleMap(props: GoogleMapProps) {
  const { boxWrapProps, children, ...mapProps } = props;
  return (
    <BoxStyled {...boxWrapProps}>
      <GoogleMapReact
        bootstrapURLKeys={bootstrapURLKeys}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        {...mapProps}
      >
        {children}
      </GoogleMapReact>
    </BoxStyled>
  );
}
