import InputBase from '@mui/material/InputBase';
import { SpriteIcon } from '../icon/icon';
import styles from './search-filter.module.scss';
import { useCatalogFilters } from '@/hooks/use-catalog-filters';
import type { ChangeEvent } from 'react';
import { useRef, useState } from 'react';
import { debounce } from '@/utils/debounce';
import Typography from '@mui/material/Typography';

export function SearchInput() {
  const { filterParams, setFilterParams } = useCatalogFilters();
  const [search, setSearch] = useState(filterParams.text || '');
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const debouncedSetFilterParams = debounce((value: { [key: string]: string }) => setFilterParams(value), timeoutIdRef);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
    debouncedSetFilterParams({ text: value.toLowerCase() });
  };

  return (
    <div className={styles.inputBlock}>
      <div className={styles.search}>
        <InputBase placeholder="Search…" value={search} onChange={(event) => handleChange(event)} />
        <SpriteIcon id="search" />
      </div>
      {search && (
        <Typography className={styles.hint}>
          List of partial match suggestions based on your input. The full equivalent is marked by:
          <span className={styles.mark}></span>
        </Typography>
      )}
    </div>
  );
}
