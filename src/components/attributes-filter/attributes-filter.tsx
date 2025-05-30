import { flatAttributes, mapAttributes } from '@/utils/catalog-utils';
import List from '@mui/material/List';
import { RangeItem } from './range-item';
import { useQuery } from '@tanstack/react-query';
import { createFacetsQueryString } from '@/utils/query-utils';
import { getProductsWithFilters, getProductType } from '@/api/catalog';
import { TermItem } from './term-item';
import { FilterAccordion } from '../accordion/accordion';

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
      <FilterAccordion title="Price">
        <RangeItem attribute={attributes.price} />
      </FilterAccordion>

      <FilterAccordion title="Brands">
        <TermItem attribute={attributes.brand} />
      </FilterAccordion>

      <FilterAccordion title="Colors">
        <TermItem attribute={attributes.color} />
      </FilterAccordion>

      <FilterAccordion title="Dimension">
        {attributes.dimension.map((attribute) => (
          <RangeItem key={attribute.key} attribute={attribute} />
        ))}
      </FilterAccordion>
    </List>
  );
}
