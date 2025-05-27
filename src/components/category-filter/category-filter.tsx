import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/api/catalog';
import { useNavigate } from 'react-router';
import { getCategoryIdFromPath, mapCategories } from '@/utils/catalog-utils';
import List from '@mui/material/List';
import { CategoryListItem } from './category-filter-item';
import { FilterAccordion } from '../accordion/accordion';
import { useEffect } from 'react';

type CategoryFilterProps = {
  handleCategoryChange: (categoryId: string | null) => void;
  activeCategory: string | null;
};

export function CategoryFilter({ handleCategoryChange, activeCategory }: CategoryFilterProps) {
  const navigate = useNavigate();
  const { data: categories } = useQuery({ queryKey: ['categories'], queryFn: getCategories });
  const categoriesMap = mapCategories(categories);

  const handleClick = (path: string, id: string) => {
    handleCategoryChange(id);
    navigate(path);
  };

  useEffect(() => {
    if (categories) {
      const pathname = window.location.pathname;
      const currentCategoryId = getCategoryIdFromPath(pathname, categories);

      if (currentCategoryId === null) {
        navigate('/404', { replace: true });
        return;
      }
      handleCategoryChange(currentCategoryId);
    }
  }, [categories, handleCategoryChange, navigate]);

  return (
    <FilterAccordion isDefaultExpanded title="Category">
      <List>
        {Object.values(categoriesMap).map(({ id, slug, name, children }) => (
          <CategoryListItem
            id={id}
            key={id}
            selectedCategoryId={activeCategory}
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
