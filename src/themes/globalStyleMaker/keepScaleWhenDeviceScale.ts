import type { GlobalStylesProps } from '@mui/material';
const keepScaleWhenDeviceScale: Required<GlobalStylesProps>['styles'] = (_theme) => ({
  '@media (max-resolution: 1x)': {
    '#__next': {
      zoom: '1',
    },
  },
  '@media (max-resolution: 2x) and (min-resolution: 1.5x)': {
    '#__next': {
      zoom: '0.7',
    },
  },
});
export default keepScaleWhenDeviceScale;
