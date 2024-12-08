import React, { useCallback, useMemo, useState } from "react";
import Gallery from "react-photo-gallery";

interface Props {
  images: string[];
}

export const CustomMultiImagePreviewSlider = (props: Props) => {
  const { images } = props;

  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event: any, { photo, index }: any) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const photos = useMemo(() => {
    return images.length >= 4 && false
      ? [
          {
            src: images[0],
            width: 7,
            height: 4,
          },
          {
            src: images[1],
            width: 7,
            height: 4,
          },
          {
            src: images[2],
            width: 1,
            height: 1,
          },
          {
            src: images[3],
            width: 1,
            height: 1,
          },
        ]
      : [
          {
            src: images[0],
            width: 4,
            height: 1,
          },
        ];
  }, [images]);

  return (
    <div>
      <Gallery photos={photos} onClick={openLightbox} direction="row" />
    </div>
  );
};
