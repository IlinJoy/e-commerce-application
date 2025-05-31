import { useCatalogFilters } from '@/hooks/use-catalog-filters';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import styles from './highlighted-text.module.scss';

type HighlightedTextParams = {
  text: string;
  isHeading?: boolean;
};

export function HighlightedText({ text, isHeading = false }: HighlightedTextParams) {
  const { filterParams } = useCatalogFilters();

  const partToHighlight = filterParams.text;
  const regex = new RegExp(`${partToHighlight}`, 'gi');
  const textParts = partToHighlight ? text.split(regex) : text;

  const variant = isHeading ? 'h5' : 'body1';
  console.log(text, textParts, partToHighlight);

  return (
    <Typography variant={variant} component={'div'} className={clsx({ [styles.description]: !isHeading })}>
      {partToHighlight && Array.isArray(textParts)
        ? textParts.map((item, index) => {
            const isLast = index < textParts.length - 1;
            return (
              <span key={index}>
                {item}
                {isLast && <span className={styles.highlight}>{partToHighlight}</span>}
              </span>
            );
          })
        : textParts}
    </Typography>
  );
}
