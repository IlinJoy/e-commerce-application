import { FILTER_KEYS } from '@/utils/constants/filters';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router';

export type FilterParams = {
  height: string[];
  width: string[];
  color: string[];
  price: string[];
  brand: string[];
  depth: string[];
  sort: string;
  text: string;
};

export function useCatalogFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const getParam = (key: string) => searchParams.get(key)?.split(',') || [];

  const getFilterParams = () => {
    const attributesFilters = Object.fromEntries(FILTER_KEYS.map((key) => [key, getParam(key)]));
    return {
      ...attributesFilters,
      sort: searchParams.get('sort'),
      text: searchParams.get('text'),
    } as Partial<FilterParams>;
  };

  const filterParams = getFilterParams();

  const setFilterParams = useCallback(
    (newValues: Partial<FilterParams>) => {
      setSearchParams(
        (params) => {
          Object.entries(newValues).forEach(([key, value]) => {
            if (Array.isArray(value) && value.length > 0) {
              params.set(key, value.join(','));
            } else if (value && !Array.isArray(value)) {
              params.set(key, value);
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

  const resetOnlyAttributesFilters = useCallback(() => {
    setFilterParams(Object.fromEntries(FILTER_KEYS.map((key) => [key, undefined])));
  }, [setFilterParams]);

  return { filterParams, setFilterParams, resetOnlyAttributesFilters };
}
