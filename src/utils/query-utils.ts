import type { FilterParams } from '@/hooks/use-catalog-filters';
import type { AttributeDefinition } from '@commercetools/platform-sdk';
import { LANG } from './constants/filters';
import { switchPrice } from './catalog-utils';

type FacetsQueryParams = { attributes?: AttributeDefinition[]; category: string | null };

export const createFacetsQueryString = ({ attributes, category }: FacetsQueryParams) => {
  const params = new URLSearchParams();
  const appendFacet = (value: string) => params.append('facet', value);

  attributes?.forEach((attribute) => {
    const { name, type } = attribute;
    switch (type.name) {
      case 'ltext':
        appendFacet(`variants.attributes.${name}.${LANG}`);
        break;
      case 'number':
        appendFacet(`variants.attributes.${name}:range(0 to *)`);
        break;
      case 'enum':
      case 'lenum':
        appendFacet(`variants.attributes.${name}.key`);
        break;
      default:
        appendFacet(`variants.attributes.${name}`);
        break;
    }
  });
  appendFacet(`variants.price.centAmount:range(0 to *)`);

  if (category) {
    params.append('filter.facets', `categories.id:"${category}"`);
  }

  return `/search?${params.toString()}&limit=0`;
};

type QueryParams = { category: string | null; filterParams: FilterParams };
type FilterParamsEntries<T> = { [K in keyof T]: [K, T[K]] }[keyof T][];
type FilterEntries = FilterParamsEntries<FilterParams>;

const getFilterParams = ({ category, filterParams }: QueryParams) => {
  const params = new URLSearchParams();
  const appendFilter = (value: string) => params.append('filter', value);

  if (category) {
    appendFilter(`categories.id:"${category}"`);
  }

  (Object.entries(filterParams) as FilterEntries).forEach(([key, value]) => {
    if (!value || value.length === 0) {
      return;
    }
    switch (key) {
      case 'price': {
        const [min, max] = value.map((value) => switchPrice(Number(value), { switchToCents: true }));
        appendFilter(`variants.price.centAmount:range(${min} to ${max})`);
        break;
      }
      case 'brand':
        appendFilter(`variants.attributes.brand.${LANG}:"${value.join('","')}"`);
        break;
      case 'color':
        appendFilter(`variants.attributes.color.key:"${value.join('","')}"`);
        break;
      case 'text': {
        params.append(`text.${LANG}`, value);
        params.append('fuzzy', 'true');
        break;
      }
      case 'sort':
        params.append(key, value);
        break;
      default:
        appendFilter(`variants.attributes.${key}:range(${value[0]} to ${value[1]})`);
        break;
    }
  });

  params.append('markMatchingVariants', 'true');
  return params;
};

export const createQueryString = ({ category, filterParams }: QueryParams) => {
  const baseParams = new URLSearchParams();
  const filterUrlParams = getFilterParams({ category, filterParams });
  const filters = filterUrlParams.size > 0 ? filterUrlParams.toString() + '&' : '';

  baseParams.append('sort', 'createdAt asc');
  return `/search?${filters}${baseParams.toString()}`;
};
