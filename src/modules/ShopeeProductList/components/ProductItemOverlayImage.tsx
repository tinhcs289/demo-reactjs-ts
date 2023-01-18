import { PRODUCT_IMAGE_HEIGHT } from '../constants';
import { styled } from '@mui/material';
import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';

const Label = styled(Box)<BoxProps>(({ theme }) => ({
  transition: 'all ease .2s',
  content: "''",
  display: 'block',
  position: 'absolute',
  width: '100%',
  height: `${PRODUCT_IMAGE_HEIGHT}px`,
  top: 0,
  left: 0,
  backgroundSize: 'cover',
  zIndex: 1,
}));

export default function ProductItemOverlayImage(props?: { image?: string }) {
  return <Label sx={{ backgroundImage: `url(https://cf.shopee.vn/file/${props?.image || ''})` }} />;
}
