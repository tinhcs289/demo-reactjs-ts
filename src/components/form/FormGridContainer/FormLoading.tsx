import CommonFallback from '@/components/CommonFallback';
import type { SxProps, Theme } from '@mui/material';

const fallbackSx: SxProps<Theme> = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  opacity: `.25 !important`,
  borderRadius: 'inherit',
  zIndex: (t) => t?.zIndex?.appBar - 1,
};

export default function FormLoading() {
  return <CommonFallback sx={fallbackSx} />;
}
