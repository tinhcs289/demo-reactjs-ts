import { Box, BoxProps, styled } from '@mui/material';
const BoxScrollOnHover = styled(Box)<BoxProps>(({ theme }) => ({
  padding: theme.spacing(2, 0, 2, 2),
  overflowY: 'scroll',
  maskImage: `linear-gradient(to top, transparent, black), linear-gradient(to left, transparent 17px, black 17px)`,
  maskSize: `100% 20000px`,
  maskPosition: `left bottom`,
  WebkitMaskImage: `linear-gradient(to top, transparent, black), linear-gradient(to left, transparent 17px, black 17px)`,
  WebkitMaskSize: '100% 20000px',
  WebkitMaskPosition: 'left bottom',
  transition: 'mask-position 0.3s, -webkit-mask-position 0.3s',
  '&:hover': {
    WebkitMaskPosition: 'left top',
  },
}));
export default BoxScrollOnHover;
