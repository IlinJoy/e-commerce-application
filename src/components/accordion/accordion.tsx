import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import { useState, type ReactNode } from 'react';
import AccordionSummary from '@mui/material/AccordionSummary';
import { SpriteIcon } from '../icon/icon';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import styles from './accordion.module.scss';

type FilterAccordionProps = {
  children: ReactNode;
  title: string;
  isExpanded?: boolean;
};

export function FilterAccordion({ isExpanded, title, children }: FilterAccordionProps) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const shouldExpand = matches && isExpanded;
  const [expanded, setExpanded] = useState(shouldExpand);

  return (
    <Accordion
      disableGutters
      expanded={expanded}
      className={styles.accordion}
      onChange={(_, isExpanded) => setExpanded(isExpanded)}
    >
      <AccordionSummary expandIcon={<SpriteIcon id="chevron" />}>
        <Typography variant="h5">{title}</Typography>
      </AccordionSummary>
      {children}
    </Accordion>
  );
}
