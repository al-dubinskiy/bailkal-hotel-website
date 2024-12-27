import { Box, Stack, SxProps } from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

interface Props {
  images: string[];
  containerStyle?: SxProps;
}

const gridItemSizes: {
  total: number;
  items: SxProps[];
}[] = [
  {
    total: 4,
    items: [
      {
        gridColumn: { xs: "1 / 13", md: "1 / 6" },
        gridRow: { xs: "1 / 2", md: "1 / 3" },
      },
      {
        gridColumn: { xs: "1 / 13", md: "6 / 10" },
        gridRow: { xs: "2 / 3", md: "1 / 3" },
      },
      {
        gridColumn: { xs: "1 / 13", md: "10 / 13" },
        gridRow: { xs: "3 / 4", md: "1 / 2" },
      },
      {
        gridColumn: { xs: "1 / 13", md: "10 / 13" },
        gridRow: { xs: "4 / 5", md: "2 / 3" },
      },
    ],
  },
  {
    total: 3,
    items: [
      {
        gridColumn: { xs: "1 / 13", md: "1 / 5" },
        gridRow: { xs: "1 / 2", md: "1 / 3" },
      },
      {
        gridColumn: { xs: "1 / 13", md: "5 / 9" },
        gridRow: { xs: "2 / 3", md: "1 / 3" },
      },
      {
        gridColumn: { xs: "1 / 13", md: "9 / 13" },
        gridRow: { xs: "3 / 4", md: "1 / 3" },
      },
    ],
  },
  {
    total: 2,
    items: [
      {
        gridColumn: { xs: "1 / 13", md: "1 / 7" },
        gridRow: { xs: "1 / 2", md: "1 / 3" },
      },
      {
        gridColumn: { xs: "1 / 13", md: "7 / 13" },
        gridRow: { xs: "2 / 3", md: "1 / 3" },
      },
    ],
  },
  {
    total: 1,
    items: [
      {
        gridColumn: { xs: "1 / 13", md: "1 / 13" },
        gridRow: { xs: "1 / 2", md: "1 / 3" },
      },
    ],
  },
];

export const CustomMultiImagePreviewSlider = (props: Props) => {
  const { images, containerStyle } = props;

  const thumbnailsRef = React.useRef<any>(null);
  const fullscreenRef = React.useRef<any>(null);
  const zoomRef = React.useRef<any>(null);

  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback(
    (event: any, { photoIndex }: { photoIndex: number }) => {
      setCurrentImageIdx(photoIndex);
      setViewerIsOpen(true);
    },
    []
  );

  const closeLightbox = () => {
    setCurrentImageIdx(0);
    setViewerIsOpen(false);
  };

  const Photos = ({ total }: { total: number }) => {
    const sizes = gridItemSizes.find((i) =>
      total > 4 ? i.total === 4 : i.total === total
    );
    if (sizes) {
      return (
        <Stack
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: "5px",
            gridAutoRows: " minmax(0, 150px)",
            marginTop: "30px",
            marginBottom: "24px",
            borderRadius: "16px",
            overflow: "hidden",
            ...containerStyle,
          }}
        >
          {images.slice(0, 4).map((item, idx) => {
            return (
              <Box
                key={idx}
                sx={{
                  ...sizes.items[idx],

                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
                onClick={(e) => openLightbox(e, { photoIndex: idx })}
              >
                <Box
                  component={"img"}
                  src={item}
                  alt={`Room photo ${idx + 1}`}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    ...sizes.items[idx],
                  }}
                />
                {/* {idx + 1} */}
              </Box>
            );
          })}
        </Stack>
      );
    }

    return null;
  };

  return (
    <>
      <Photos total={images.length} />
      <Lightbox
        open={viewerIsOpen}
        close={closeLightbox}
        index={currentImageIdx}
        slides={images.map((i, idx) => ({
          src: i,
          alt: `Room photo ${idx + 1}`,
        }))}
        plugins={[Counter, Thumbnails, Fullscreen, Zoom]}
        counter={{ container: { style: { top: "unset", bottom: 0 } } }}
        thumbnails={{ ref: thumbnailsRef }}
        fullscreen={{ ref: fullscreenRef }}
        on={{
          click: () => {
            (thumbnailsRef.current?.visible
              ? thumbnailsRef.current?.hide
              : thumbnailsRef.current?.show)?.();
            fullscreenRef.current?.enter();
          },
        }}
      />
    </>
  );
};
