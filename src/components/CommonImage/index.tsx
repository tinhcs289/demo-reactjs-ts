import type { ComponentType } from 'react';
import { LazyLoadImage, LazyLoadImageProps } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const CommonImage: ComponentType<LazyLoadImageProps> = (props) => {
  return <LazyLoadImage effect="blur" {...props} />;
};
export default CommonImage;
