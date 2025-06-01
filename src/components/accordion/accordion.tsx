import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import type { ElementType } from 'react';
import { type ReactNode } from 'react';
import AccordionSummary from '@mui/material/AccordionSummary';
import { SpriteIcon } from '../icon/icon';

type FilterAccordionProps = {
  children: ReactNode;
  title: string;
  isDefaultExpanded?: boolean;
  component?: ElementType;
};

export function FilterAccordion({
  isDefaultExpanded = true,
  title,
  children,
  component = 'div',
}: FilterAccordionProps) {
  return (
    <Accordion defaultExpanded={isDefaultExpanded} component={component}>
      <AccordionSummary expandIcon={<SpriteIcon id="chevron" />}>
        <Typography variant="h5">{title}</Typography>
      </AccordionSummary>
      {children}
    </Accordion>
  );
}
