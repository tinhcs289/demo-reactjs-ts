import { styled } from '@mui/material';
import type { CardProps } from '@mui/material/Card';
import Card from '@mui/material/Card';

const ProductItemCard = styled(Card)<CardProps>(({ theme }) => ({
  position: 'relative',
  transition: 'all ease .2s',
  ':before': {
    transition: 'all ease .2s',
    content: "''",
    display: 'block',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
    border: '2px solid transparent',
  },
  ':hover': {
    overflow: 'unset',
    boxShadow: theme.shadows[4],
    ':before': {
      border: `2px solid ${theme.palette.primary.main}`,
    },
    '& .btn-find-similar': {
      height: '34.75px',
    },
  },
}));
export default ProductItemCard;
