import CommonImage from '@/components/media/CommonImage';
import { styled } from '@mui/material';
import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import { A11y, Pagination, Virtual } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { BANNER_HEIGHT, IMAGES } from '../constants';
const BoxStyled = styled(Box)<BoxProps>(({ theme }) => ({
  padding: 0,
  margin: 0,
  height: `${BANNER_HEIGHT}px`,
  background: '#c80118',
  '& div.swiper': {
    margin: '0 auto',
    [theme.breakpoints.up('md')]: {
      width: theme.breakpoints.values.md,
    },
    [theme.breakpoints.up('lg')]: {
      width: theme.breakpoints.values.lg,
    },
  },
}));
const BoxImage = styled(Box)<BoxProps>(({ theme }) => ({
  padding: 0,
  margin: 0,
  textAlign: 'center',
  height: `${BANNER_HEIGHT}px`,
  width: '100%',
  '& img': {},
}));
export default function BannerSlider(props?: Omit<BoxProps, 'children'>) {
  return (
    <BoxStyled {...props}>
      <Swiper
        modules={[Pagination, A11y, Virtual]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        virtual
      >
        {IMAGES.map((img, i) => (
          <SwiperSlide key={i} virtualIndex={i} style={{ width: '100%' }}>
            <BoxImage>
              <CommonImage src={img} height={`${BANNER_HEIGHT}px`} />
            </BoxImage>
          </SwiperSlide>
        ))}
      </Swiper>
    </BoxStyled>
  );
}
