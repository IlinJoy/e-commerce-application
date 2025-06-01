import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';
import { type Dispatch, type SetStateAction } from 'react';
import { CategoryFilter } from '../category-filter/category-filter';
import { AttributesFilter } from '../attributes-filter/attributes-filter';
import { useCatalogFilters } from '@/hooks/use-catalog-filters';
import styles from './catalog-filters.module.scss';

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
    <aside className={styles.filtersWrapper}>
      <CategoryFilter
        handleCategoryChange={handleCategoryChange}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <Typography className={styles.heading} variant="h4">
        Filters
      </Typography>
      <AttributesFilter activeCategory={activeCategory} />
      <Button className={styles.reset} onClick={handleReset}>
        Reset All
      </Button>
    </aside>
  );
}
