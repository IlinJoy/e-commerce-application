import type { AttributeDefinition } from '@commercetools/platform-sdk';

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

type QueryParams = { attributes?: AttributeDefinition[]; category: string | null };

export const createFacetsQueryString = ({ attributes, category }: QueryParams) => {
  const FACET_BASE = 'facet=variants.';
  const lang = 'en-US';
  const result = [];

  attributes?.forEach((attribute) => {
    if (!attribute.name || !attribute.type) {
      return;
    }
    const name = attribute.name;

    switch (attribute.type.name) {
      case 'ltext':
        result.push(`attributes.${name}.${lang}`);
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

export const createQueryString = ({ category }: QueryParams) => {
  const result = [];

  const FILTER_BASE = 'filter=';

  if (category) {
    result.push(`categories.id:"${category}"`);
  }

  return result.length > 0 ? `/search?${FILTER_BASE}${result.join(' AND ')}` : '';
};
