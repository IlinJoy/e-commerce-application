import { useCatalogFilters } from '@/hooks/use-catalog-filters';
import type { FilterAttribute } from '@/utils/constants/filters';
import { debounce } from '@/utils/debounce';
import ListItem from '@mui/material/ListItem';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router';

type RangeItemProps = {
  attribute: FilterAttribute;
};

export function RangeItem({ attribute: { key, label, max } }: RangeItemProps) {
  const { filterParams, setFilterParams } = useCatalogFilters();
  const [searchParams] = useSearchParams();
  const defaultValue = filterParams[key]?.length ? filterParams[key].map(Number) : [0, max!];
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [filter, setFilter] = useState(defaultValue);

  useEffect(() => {
    if (searchParams.size === 0) {
      setFilter([0, max!]);
    }
  }, [max, searchParams]);

  const debouncedSetFilterParams = debounce(
    (newFilter: { [key: string]: string[] }) => setFilterParams(newFilter),
    timeoutIdRef
  );

  const handleSliderChange = (_: Event, newValue: number[]) => {
    setFilter(newValue);
    debouncedSetFilterParams({ [key]: newValue.map(String) });
  };

  return (
    <ListItem>
      <Typography>{label}</Typography>
      <Slider
        value={filter}
        onChange={(_, newValue) => handleSliderChange(_, newValue)}
        valueLabelDisplay="auto"
        min={0}
        max={max}
        marks={[
          { value: 0, label: 0 },
          { value: max!, label: max },
        ]}
      />
    </ListItem>
  );
}
