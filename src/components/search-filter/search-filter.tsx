import InputBase from '@mui/material/InputBase';
import { SpriteIcon } from '../icon/icon';
import styles from './search-filter.module.scss';
import { useCatalogFilters } from '@/hooks/use-catalog-filters';
import type { ChangeEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { debounce } from '@/utils/debounce';
import { useSearchParams } from 'react-router';
import Tooltip from '@mui/material/Tooltip';
import { SUCCESS_MESSAGES } from '@/utils/constants/messages';

export function SearchInput() {
  const { filterParams, setFilterParams } = useCatalogFilters();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(filterParams.text || '');
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (!searchParams.has('text')) {
      setSearch('');
    }
  }, [searchParams]);

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
        <Tooltip title={SUCCESS_MESSAGES.SEARCHING} arrow>
          <span className={styles.mark}>?</span>
        </Tooltip>
      )}
    </div>
  );
}
