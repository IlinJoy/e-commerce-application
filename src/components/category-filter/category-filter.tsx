import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/api/catalog';
import { useNavigate } from 'react-router';
import { getCategoryIdFromPath, mapCategories } from '@/utils/catalog-utils';
import List from '@mui/material/List';
import { CategoryListItem } from './category-filter-item';
import { FilterAccordion } from '../accordion/accordion';
import type { Dispatch, SetStateAction } from 'react';
import { useEffect } from 'react';
import { LANG } from '@/utils/constants/filters';

type CategoryFilterProps = {
  handleCategoryChange: (categoryId: string | null) => void;
  activeCategory: string | null;
  setActiveCategory: Dispatch<SetStateAction<string | null>>;
};

export function CategoryFilter({ handleCategoryChange, setActiveCategory, activeCategory }: CategoryFilterProps) {
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
      if (currentCategoryId !== activeCategory) {
        setActiveCategory(currentCategoryId);
      }
    }
  }, [activeCategory, categories, navigate, setActiveCategory]);

  return (
    <FilterAccordion isDefaultExpanded title="Categories">
      <List>
        {Object.values(categoriesMap).map(({ id, slug, name, children }) => (
          <CategoryListItem
            id={id}
            key={id}
            selectedCategoryId={activeCategory}
            slug={slug[LANG]}
            onClick={handleClick}
            name={name[LANG]}
            children={children}
            level={0}
          />
        ))}
      </List>
    </FilterAccordion>
  );
}
