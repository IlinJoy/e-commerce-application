import type { FilterParams } from '@/hooks/use-catalog-filters';
import type { AttributeDefinition } from '@commercetools/platform-sdk';
import type { FilterKey } from './constants/filters';
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

const LANG = 'en-US';

type FacetsQueryParams = { attributes?: AttributeDefinition[]; category: string | null };

export const createFacetsQueryString = ({ attributes, category }: FacetsQueryParams) => {
  const FACET_BASE = 'facet=variants.';

  const result = [];

  attributes?.forEach((attribute) => {
    if (!attribute.name || !attribute.type) {
      return;
    }
    const name = attribute.name;

    switch (attribute.type.name) {
      case 'ltext':
        result.push(`attributes.${name}.${LANG}`);
        break;
      case 'number':
        result.push(`attributes.${name}:range(0 to *)`);
        break;
      case 'enum':
      case 'lenum':
        result.push(`attributes.${name}.key`);
        break;
      default:
        result.push(`attributes.${name}`);
        break;
    }
  });
  result.push(`price.centAmount:range(0 to *)`);

  return (
    `/search?${FACET_BASE}${result.join(`&${FACET_BASE}`)}` +
    (category ? `&filter.facets=categories.id:"${category}"` : '') +
    '&limit=0'
  );
};

type QueryParams = { category: string | null; filterParams: Partial<FilterParams> };
export const createQueryString = ({ category, filterParams }: QueryParams) => {
  const result = [];

  const FILTER_BASE = 'filter=';

  if (category) {
    result.push(`categories.id:"${category}"`);
  }

  Object.entries(filterParams).forEach(([key, values]) => {
    if (values.length > 0) {
      switch (key as FilterKey) {
        case 'price': {
          const [min, max] = values.map((value) => switchPrice(Number(value), { switchToCents: true }));
          result.push(`variants.price.centAmount:range(${min} to ${max})`);
          break;
        }
        case 'brand':
          result.push(`variants.attributes.brand.${LANG}:"${values.join('","')}"`);
          break;
        case 'color':
          result.push(`variants.attributes.color.key:"${values.join('","')}"`);
          break;
        default:
          result.push(`variants.attributes.${key}:range(${values[0]} to ${values[1]})`);
          break;
      }
    }
  });

  return result.length > 0 ? `/search?${FILTER_BASE}${result.join(`&${FILTER_BASE}`)}` : '';
};
