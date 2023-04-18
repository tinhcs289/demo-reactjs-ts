import { LazyLoadImage } from 'react-lazy-load-image-component';
import type { CommonImageProps } from './_types';
import 'react-lazy-load-image-component/src/effects/blur.css';
export default function CommonImage(props: CommonImageProps) {
  return <LazyLoadImage effect="blur" {...props} />;
}
