import { styled } from '@mui/material';
import type { ButtonBaseProps } from '@mui/material/ButtonBase';
import ButtonBase from '@mui/material/ButtonBase';

const BrandButton = styled(ButtonBase)<ButtonBaseProps>(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  flexDirection: 'column',
  transition: 'all ease .2s',
  padding: theme.spacing(0.25),
  background: theme.palette.background.paper,
  position: 'relative',
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
export default BrandButton;
