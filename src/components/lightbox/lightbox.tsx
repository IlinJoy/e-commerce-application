import Lightbox from 'yet-another-react-lightbox';
import Inline from 'yet-another-react-lightbox/plugins/inline';
import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import 'yet-another-react-lightbox/styles.css';
import type { Image } from '@commercetools/platform-sdk';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

type ProductLightboxProps = {
  images: Image[];
  slideIndex: number;
  setSlideIndex: Dispatch<SetStateAction<number>>;
};

export function ProductLightbox({ images, slideIndex, setSlideIndex }: ProductLightboxProps) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const slides = images?.map((image) => ({
    src: image.url,
    alt: image.label,
  }));
  const isSingle = slides.length <= 1;
  const renderSingleOptions = {
    buttonPrev: () => null,
    buttonNext: () => null,
  };

  return (
    <>
      <Lightbox
        index={slideIndex}
        on={{
          view: ({ index }) => setSlideIndex(index),
          click: () => setOpen(true),
        }}
        slides={slides}
        plugins={[Inline]}
        carousel={{
          padding: 0,
          spacing: '8px',
          imageFit: 'cover',
          finite: isSingle,
        }}
        inline={{
          style: {
            aspectRatio: '2 / 3',
            minHeight: matches ? '70vh' : '55vh',
            borderRadius: '8px',
            overflow: 'hidden',
            cursor: 'pointer',
          },
        }}
        render={{
          ...(isSingle && renderSingleOptions),
        }}
      />

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={slideIndex}
        slides={slides}
        animation={{ fade: 250 }}
        controller={{ closeOnBackdropClick: true }}
        render={{
          ...(isSingle && renderSingleOptions),
        }}
      />
    </>
  );
}
