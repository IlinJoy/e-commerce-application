import type { FilterParams } from '@/hooks/use-catalog-filters';
import type { AttributeDefinition } from '@commercetools/platform-sdk';
import { LANG } from './constants/filters';
import { switchPrice } from './catalog-utils';

export type Attributes = {
  name?: string;
  label?: string;
  type?:
    | 'number'
    | 'boolean'
    | 'datetime'
    | 'date'
    | 'enum'
    | 'ltext'
    | 'lenum'
    | 'money'
    | 'nested'
    | 'reference'
    | 'set'
    | 'text'
    | 'time';
}[];

type FacetsQueryParams = { attributes?: AttributeDefinition[]; category: string | null };

export const createFacetsQueryString = ({ attributes, category }: FacetsQueryParams) => {
  const params = new URLSearchParams();
  const appendFacet = (value: string) => params.append('facet', value);

  attributes?.forEach((attribute) => {
    if (!attribute.name || !attribute.type) {
      return;
    }
    const name = attribute.name;
    switch (attribute.type.name) {
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

type QueryParams = { category: string | null; filterParams: Partial<FilterParams> };
type FilterParamsEntries = [keyof FilterParams, string[] | string][];

export const createQueryString = ({ category, filterParams }: QueryParams) => {
  const params = new URLSearchParams();
  const appendFilter = (value: string) => params.append('filter', value);

  if (category) {
    appendFilter(`categories.id:"${category}"`);
  }

  (Object.entries(filterParams) as FilterParamsEntries).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length > 0) {
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
        default:
          appendFilter(`variants.attributes.${key}:range(${value[0]} to ${value[1]})`);
          break;
      }
    }
    if (!Array.isArray(value) && value) {
      params.append(key, value);
    }
  });
  const shouldSetFilters = params.size > 0 || !!filterParams.sort;

  return shouldSetFilters ? `/search?${params.toString()}` : '';
};
