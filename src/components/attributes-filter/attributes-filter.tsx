import { flatAttributes, mapAttributes } from '@/utils/catalog-utils';
import List from '@mui/material/List';
import { RangeItem } from './range-item/range-item';
import { useQuery } from '@tanstack/react-query';
import { createFacetsQueryString } from '@/utils/query-utils';
import { getProductsWithFilters, getProductType } from '@/api/catalog';
import { TermItem } from './term-item/term-item';
import { FilterAccordion } from '../accordion/accordion';
import Typography from '@mui/material/Typography';
import styles from './attributes-filter.module.scss';
import { useSearchParams } from 'react-router';

type AttributesFilterProps = {
  activeCategory: string | null;
};

export function AttributesFilter({ activeCategory }: AttributesFilterProps) {
  const [searchParams] = useSearchParams();
  const { data: rawAttributes } = useQuery({ queryKey: ['types'], queryFn: getProductType, select: flatAttributes });

  const { data: attributes, isPending } = useQuery({
    queryKey: ['facets', activeCategory],
    queryFn: async () => {
      const queryString = createFacetsQueryString({ category: activeCategory, attributes: rawAttributes });
      return await getProductsWithFilters(queryString);
    },
    enabled: !!rawAttributes,
    select: (data) => mapAttributes(rawAttributes, data.facets),
  });

  if (isPending || !attributes) {
    return <div>Updating...</div>;
  }

  const shouldExpand = (keys: string[]) => keys.some((key) => !!searchParams.get(key));
  const { price, dimension, color, brand } = attributes;

  return (
    <List>
      <FilterAccordion title={price.label} isExpanded={shouldExpand([price.key])}>
        <RangeItem attribute={price} measurement="$" />
      </FilterAccordion>

      <FilterAccordion title={brand.label} isExpanded={shouldExpand([brand.key])}>
        <TermItem attribute={brand} />
      </FilterAccordion>

      <FilterAccordion title={color.label} isExpanded={shouldExpand([color.key])}>
        <TermItem attribute={color} />
      </FilterAccordion>

      <FilterAccordion title="Dimension" isExpanded={shouldExpand(dimension.map((entry) => entry.key))}>
        {dimension.map((attribute) => (
          <div key={attribute.key} className={styles.dimension}>
            <Typography>{attribute.label}</Typography>
            <RangeItem attribute={attribute} measurement="cm" />
          </div>
        ))}
      </FilterAccordion>
    </List>
  );
}
