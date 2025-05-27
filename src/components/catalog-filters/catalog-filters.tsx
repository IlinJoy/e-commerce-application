import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';
import type { Dispatch, SetStateAction } from 'react';
import { CategoryFilter } from '../category-filter/category-filter';
import { useCatalogFilters } from '@/hooks/use-catalog-filters';

export type FilterValues = {
  width: number[];
  height: number[];
  depth: number[];
  color: string[];
  price: number[];
};

const defaultFilterValues = {
  width: [0, 100],
  height: [0, 100],
  depth: [0, 100],
  color: [],
  price: [0, 100],
};

type CatalogFiltersProps = {
  activeCategory: string | null;
  setActiveCategory: Dispatch<SetStateAction<string | null>>;
};

export function CatalogFilters({ activeCategory, setActiveCategory }: CatalogFiltersProps) {
  const { setFilterParams } = useCatalogFilters();
  const navigate = useNavigate();

  const handleCategoryChange = (categoryId: string | null) => {
    setActiveCategory(categoryId);
  };

  const handleReset = () => {
    setFilterParams(defaultFilterValues);
    setActiveCategory('');
    navigate('');
  };

  return (
    <aside>
      <Typography variant="h4">Filters</Typography>
      <CategoryFilter handleCategoryChange={handleCategoryChange} activeCategory={activeCategory} />
      <Button onClick={handleReset}>Reset</Button>
    </aside>
  );
}
