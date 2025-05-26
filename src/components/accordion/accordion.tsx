import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import type { ReactNode } from 'react';
import AccordionSummary from '@mui/material/AccordionSummary';
import { SpriteIcon } from '../icon/icon';

type FilterAccordionProps = {
  children: ReactNode;
  title: string;
  isDefaultExpanded: boolean;
};

export function FilterAccordion({ isDefaultExpanded, title, children }: FilterAccordionProps) {
  return (
    <Accordion defaultExpanded={isDefaultExpanded}>
      <AccordionSummary expandIcon={<SpriteIcon id="chevron" />}>
        <Typography variant="h5">{title}</Typography>
      </AccordionSummary>
      {children}
    </Accordion>
  );
}
