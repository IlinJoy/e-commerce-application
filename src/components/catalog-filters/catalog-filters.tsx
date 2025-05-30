import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';
import { type Dispatch, type SetStateAction } from 'react';
import { CategoryFilter } from '../category-filter/category-filter';
import { AttributesFilter } from '../attributes-filter/attributes-filter';
import { useCatalogFilters } from '@/hooks/use-catalog-filters';

type CatalogFiltersProps = {
  activeCategory: string | null;
  setActiveCategory: Dispatch<SetStateAction<string | null>>;
};

export function CatalogFilters({ activeCategory, setActiveCategory }: CatalogFiltersProps) {
  const { resetFiltersParams } = useCatalogFilters();
  const navigate = useNavigate();

  const handleCategoryChange = (categoryId: string | null) => {
    setActiveCategory(categoryId);
    resetFiltersParams();
  };

  const handleReset = () => {
    setActiveCategory('');
    navigate('');
  };

  return (
    <aside>
      <Typography variant="h4">Filters</Typography>
      <CategoryFilter
        handleCategoryChange={handleCategoryChange}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <AttributesFilter activeCategory={activeCategory} />
      <Button onClick={handleReset}>Reset All</Button>
    </aside>
  );
}
