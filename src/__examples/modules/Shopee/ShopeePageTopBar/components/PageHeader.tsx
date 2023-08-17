import { BANNER_HEIGHT } from '@/__examples/modules/Shopee/ShopeeTopBanner';
import { styled } from '@mui/material';
import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
const BoxHeader = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  zIndex: theme.zIndex.appBar - 1,
  transition: 'all 0.3s ease',
  '&:not(.sticky-header)': {
    background: 'transparent',
    '& .MuiBadge-root > MuiBadge-badge': {
      background: theme.palette.primary.main,
    },
    '& .MuiBadge-root > MuiSvgIcon-root': {
      color: theme.palette.primary.main,
    },
  },
  '&.sticky-header': {
    animation: `$animationHeader 0.4s ${theme.transitions.easing.easeInOut}`,
    background: theme.palette.action.hover,
    backdropFilter: 'blur(10px)',
    borderBottom: `1px solid ${theme.palette.action.active}`,
    '& .MuiBadge-root > MuiSvgIcon-root': {
      color: theme.palette.primary.contrastText,
    },
  },
  [`@keyframes animationHeader`]: {
    '0%': {
      transform: 'translateY(-50px)',
    },
    '100%': {
      transfrom: 'translateY(0)',
    },
  },
  [`@-webkit-keyframes animationHeader`]: {
    '0%': {
      transform: 'translateY(-50px)',
    },
    '100%': {
      transfrom: 'translateY(0)',
    },
  },
  [`@-moz-keyframes animationHeader`]: {
    '0%': {
      transform: 'translateY(-50px)',
    },
    '100%': {
      transfrom: 'translateY(0)',
    },
  },
}));
export default function PageHeader(props?: { children?: ReactNode }) {
  useEffect(() => {
    const stickyEl = document.querySelector('.kt_header');
    if (stickyEl) {
      window.addEventListener('scroll', () => {
        let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollPosition > BANNER_HEIGHT) {
          stickyEl.classList.add('sticky-header');
        } else {
          stickyEl.classList.remove('sticky-header');
        }
      });
    }
  }, []);
  return <BoxHeader className="kt_header">{props?.children}</BoxHeader>;
}
