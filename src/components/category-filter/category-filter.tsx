import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/api/catalog';
import { useNavigate } from 'react-router';
import type { DefaultFilterValues } from '../catalog-filters/catalog-filters';
import { mapCategories } from '@/utils/catalog-utils';
import List from '@mui/material/List';
import { CategoryListItem } from './category-list-item';
import { FilterAccordion } from '../accordion/accordion';

type CategoryFilterProps = {
  handleCategoryChange: (categoryId: string) => void;
  filterValues: DefaultFilterValues;
};

export function CategoryFilter({ handleCategoryChange, filterValues }: CategoryFilterProps) {
  const { data: categories } = useQuery({ queryKey: ['categories'], queryFn: getCategories });
  const navigate = useNavigate();

  const categoriesMap = mapCategories(categories);

  const handleClick = (path: string, id: string) => {
    handleCategoryChange(id);
    navigate(path);
  };

  return (
    <FilterAccordion isDefaultExpanded title="Category">
      <List>
        {Object.values(categoriesMap).map(({ id, slug, name, children }) => (
          <CategoryListItem
            id={id}
            selectedCategoryId={filterValues.category}
            slug={slug['en-US']}
            onClick={handleClick}
            name={name['en-US']}
            children={children}
            level={0}
          />
        ))}
      </List>
    </FilterAccordion>
  );
}
