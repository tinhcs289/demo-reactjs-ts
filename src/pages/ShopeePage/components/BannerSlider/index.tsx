import CommonImage from '@/components/CommonImage';
import { BANNER_HEIGHT } from '@/pages/ShopeePage/contants';
import { styled } from '@mui/material';
import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import { A11y, Pagination, Virtual } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';

const IMAGES: string[] = [
  'https://cf.shopee.vn/file/632ecf689397cbf5401bf2724e6fe57d_xxhdpi',
  'https://cf.shopee.vn/file/5b5de1582d99cbbe75a8f9a5c4dae1c2_xxhdpi',
  'https://cf.shopee.vn/file/ccf10ae4a765a879ca4869cfe2f05567_xxhdpi',
  'https://cf.shopee.vn/file/253cf2d9f6aaef1c63facb7c4f40c3dc_xxhdpi',
  'https://cf.shopee.vn/file/bd17ce5c38c6e97ce74d47eff1839d20_xxhdpi',
  'https://cf.shopee.vn/file/0700aba61f2accd2245e91fd9b029fec_xxhdpi',
  'https://cf.shopee.vn/file/0700aba61f2accd2245e91fd9b029fec_xxhdpi',
  'https://cf.shopee.vn/file/b85ae3e263250c33a956b9e46b61d620_xxhdpi',
  'https://cf.shopee.vn/file/9622ada5eeb4cdd0004398aa70d11762_xxhdpi',
  'https://cf.shopee.vn/file/2ac4cd33109e8b34127d0da507657674_xxhdpi',
  'https://cf.shopee.vn/file/fc4d9a7518e6c35ead7242e3691b0d16_xxhdpi',
  'https://cf.shopee.vn/file/632ecf689397cbf5401bf2724e6fe57d_xxhdpi',
  'https://cf.shopee.vn/file/5b5de1582d99cbbe75a8f9a5c4dae1c2_xxhdpi',
];

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
