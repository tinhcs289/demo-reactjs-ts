import { styled } from '@mui/material';
import type { CardProps } from '@mui/material/Card';
import Card from '@mui/material/Card';

const CardProduct = styled(Card)<CardProps>(({ theme }) => ({
  position: 'relative',
  transition: 'all ease .2s',
  ':after': {
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
    boxShadow: theme.shadows[4],
    ':after': {
      border: `2px solid ${theme.palette.primary.main}`,
    },
  },
}));
export default CardProduct;
