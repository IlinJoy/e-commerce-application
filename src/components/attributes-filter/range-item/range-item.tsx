import { useCatalogFilters } from '@/hooks/use-catalog-filters';
import type { FilterAttribute } from '@/utils/constants/filters';
import { debounce } from '@/utils/debounce';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import Slider from '@mui/material/Slider';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router';
import styles from './range-item.module.scss';

type RangeItemProps = {
  attribute: FilterAttribute;
  measurement: string;
};

export function RangeItem({ attribute: { key, max }, measurement }: RangeItemProps) {
  const { filterParams, setFilterParams } = useCatalogFilters();
  const [searchParams] = useSearchParams();
  const defaultValue = filterParams[key]?.length ? filterParams[key].map(Number) : [0, max!];
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [filter, setFilter] = useState(defaultValue);

  useEffect(() => {
    if (!searchParams.has(key)) {
      setFilter([0, max!]);
    }
  }, [key, max, searchParams]);

  const debouncedSetFilterParams = debounce(
    (newFilter: { [key: string]: string[] }) => setFilterParams(newFilter),
    timeoutIdRef
  );

  const handleSliderChange = (_: Event, newValue: number[]) => {
    setFilter(newValue);
    debouncedSetFilterParams({ [key]: newValue.map(String) });
  };

  return (
    <ListItem className={styles.range}>
      <Slider
        value={filter}
        size="small"
        onChange={(_, newValue) => handleSliderChange(_, newValue)}
        valueLabelDisplay="auto"
        min={0}
        max={max}
      />
      <div className={styles.measurement}>
        <Typography component="span">{`${measurement} 0`}</Typography>
        <Typography component="span">{`${measurement} ${max}`}</Typography>
      </div>
    </ListItem>
  );
}
