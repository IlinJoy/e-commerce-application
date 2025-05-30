import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useCatalogFilters } from '@/hooks/use-catalog-filters';
import type { FilterAttribute } from '@/utils/constants/filters';

type TermItemItemProps = {
  attribute: FilterAttribute;
};

export function TermItem({ attribute: { key, label, terms } }: TermItemItemProps) {
  const { filterParams, setFilterParams } = useCatalogFilters();
  const currentValues = filterParams?.[key];
  const isChecked = (term: string) => currentValues?.includes(term) || false;

  const handleToggle = (term: string) => {
    let checkedArray = [...(currentValues || [])];

    if (!isChecked(term)) {
      checkedArray.push(term);
    } else {
      checkedArray = checkedArray.filter((item) => item !== term);
    }
    setFilterParams({ [key]: checkedArray });
  };

  return (
    <ListItem>
      <Typography>{label}</Typography>
      {terms!.map(({ term }) => (
        <ListItemButton key={term} onClick={() => handleToggle(term)} dense>
          <ListItemIcon>
            <Checkbox edge="start" checked={isChecked(term)} disableRipple />
          </ListItemIcon>
          <ListItemText id={term} primary={term} />
        </ListItemButton>
      ))}
    </ListItem>
  );
}
