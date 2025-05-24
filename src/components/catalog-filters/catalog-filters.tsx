import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';

export function CatalogFilters() {
  const navigate = useNavigate();
  const categories = ['a', 'b', 'c'];

  return (
    <aside>
      <Typography>Filters</Typography>
      <Button onClick={() => navigate(categories[0])}>Category</Button>
    </aside>
  );
}
