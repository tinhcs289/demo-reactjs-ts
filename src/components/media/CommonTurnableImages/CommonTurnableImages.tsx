import type { CSSProperties, FC, MouseEvent } from 'react';
import { useEffect } from 'react';
import type { CommonTurnableImagesFullProps } from './_types';
import { useTurntableState } from './hooks';

/** Base `className` for images. */
export const CLASS_NAME_IMG = '__react-image-turntable-img';
/** `className` of first rendered image (sets the size of the main component). */
export const CLASS_NAME_IMG_PRIMARY = `${CLASS_NAME_IMG}--primary`;
/** `className` of subsequent images. */
export const CLASS_NAME_IMG_SECONDARY = `${CLASS_NAME_IMG}--secondary`;

const imgBaseStyle = {
  maxWidth: '100%',
};

/**
 * Firefox desktop tries to drag the image on `mousedown` + `mousemove` so we need to prevent it
 * then mimic the default behavior of the browser.
 */
const handleImgDragStart = (ev: MouseEvent<HTMLImageElement>) => {
  ev.preventDefault();
};

export const CommonTurnableImages: FC<CommonTurnableImagesFullProps> = ({
  images,
  initialImageIndex = 0,
  style,
  tabIndex = 0,
  movementSensitivity = 20,
  onIndexChange,
  autoRotate = { disabled: false },
  ...props
}) => {
  const { ref, activeImageIndex } = useTurntableState({
    initialImageIndex,
    imagesCount: images.length - 1,
    movementSensitivity,
    autoRotate,
  });

  const rootStyle: CSSProperties = {
    position: 'relative',
    touchAction: 'none',
    userSelect: 'none',
    ...style,
  };

  useEffect(() => {
    if (onIndexChange) onIndexChange(activeImageIndex);
  }, [activeImageIndex, onIndexChange]);

  return (
    <div
      aria-label="Image turntable"
      {...props}
      ref={ref}
      role="slider"
      aria-valuemin={1}
      aria-valuemax={images.length}
      aria-valuenow={activeImageIndex + 1}
      aria-valuetext={`${activeImageIndex + 1} of ${images.length}`}
      style={rootStyle}
      tabIndex={tabIndex}
    >
      {images.map((src, index) => (
        // eslint-disable-next-line jsx-a11y/img-redundant-alt
        <img
          key={src}
          className={`${CLASS_NAME_IMG} ${index === 0 ? CLASS_NAME_IMG_PRIMARY : CLASS_NAME_IMG_SECONDARY}`}
          src={src}
          alt={`Turntable image ${index + 1}`}
          draggable={false}
          onDragStart={handleImgDragStart}
          style={{
            ...imgBaseStyle,
            position: index === 0 ? undefined : 'absolute',
            opacity: index === activeImageIndex ? 1 : 0,
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      ))}
    </div>
  );
};
