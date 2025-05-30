import type { FilterKey } from '@/utils/constants/filters';
import { FILTER_KEYS } from '@/utils/constants/filters';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router';

export type FilterParams = Record<FilterKey, string[]>;

export function useCatalogFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const getParam = (key: string): (string | number)[] => searchParams.get(key)?.split(',') || [];

  const getFilterParams = () => {
    return Object.fromEntries(FILTER_KEYS.map((key) => [key, getParam(key)])) as Partial<FilterParams>;
  };

  const filterParams = getFilterParams();

  const setFilterParams = useCallback(
    (newValues: { [k: string]: string[] }) => {
      setSearchParams(
        (params) => {
          Object.entries(newValues).forEach(([key, value]) => {
            if (value.length > 0) {
              params.set(key, value.join(','));
            } else {
              params.delete(key);
            }
          });
          return params;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  const resetFiltersParams = useCallback(() => {
    setSearchParams(new URLSearchParams(), { replace: true });
  }, []);

  return { filterParams, setFilterParams, resetFiltersParams };
}
