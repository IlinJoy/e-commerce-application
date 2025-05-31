import { useCatalogFilters } from '@/hooks/use-catalog-filters';
import { LANG } from '@/utils/constants/filters';
import MenuItem from '@mui/material/MenuItem';
import type { SelectChangeEvent } from '@mui/material/Select';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

export function SortFilter() {
  const { filterParams, setFilterParams } = useCatalogFilters();

  const handleChange = (event: SelectChangeEvent) => {
    setFilterParams({ sort: event.target.value });
  };

  return (
    <div>
      <Typography>Sort by:</Typography>
      <Select value={filterParams['sort'] || ''} onChange={handleChange}>
        <MenuItem value={`name.${LANG} asc`}>Name from A to Z</MenuItem>
        <MenuItem value={`name.${LANG} desc`}>Name from Z to A</MenuItem>
        <MenuItem value={`price asc`}>Price from low to high</MenuItem>
        <MenuItem value={`price desc`}>Price from high to low</MenuItem>
      </Select>
    </div>
  );
}
