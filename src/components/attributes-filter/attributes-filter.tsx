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

type AttributesFilterProps = {
  activeCategory: string | null;
};

export function AttributesFilter({ activeCategory }: AttributesFilterProps) {
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

  return (
    <List>
      <FilterAccordion title={attributes.price.label} component="li">
        <RangeItem attribute={attributes.price} measurement="$" />
      </FilterAccordion>

      <FilterAccordion title={attributes.brand.label} component="li">
        <TermItem attribute={attributes.brand} />
      </FilterAccordion>

      <FilterAccordion title={attributes.color.label} component="li">
        <TermItem attribute={attributes.color} />
      </FilterAccordion>

      <FilterAccordion title="Dimension" component="li">
        {attributes.dimension.map((attribute) => (
          <div key={attribute.key} className={styles.dimension}>
            <Typography>{attribute.label}</Typography>
            <RangeItem attribute={attribute} measurement="cm" />
          </div>
        ))}
      </FilterAccordion>
    </List>
  );
}
