import type { AttributeDefinition, Category, FacetResults, Price, ProductType } from '@commercetools/platform-sdk';
import { LANG, type FilterAttribute, type FilterKey } from './constants/filters';

export type CategoryWithChildren = Category & { children: CategoryWithChildren[] };
type TogglePriceOptions = { switchToCents?: boolean; fractionDigits?: number };

export const switchPrice = (amount: number, { switchToCents = false, fractionDigits }: TogglePriceOptions) => {
  const POW_BASE = 10;
  const DEFAULT_FRACTION_DIGITS = 2;
  const conversionFactor = POW_BASE ** (fractionDigits || DEFAULT_FRACTION_DIGITS);

  return switchToCents ? amount * conversionFactor : amount / conversionFactor;
};

export const mapCategories = (categories?: Category[]) => {
  const categoriesMap = categories?.reduce<Record<string, CategoryWithChildren>>((acc, category) => {
    const categoryWithChildren = { ...category, children: [] };
    const parentId = category.parent?.id;

    if (parentId) {
      acc[parentId] = acc[parentId] || {
        ...category.parent,
        children: [],
      };
      acc[parentId].children.push(categoryWithChildren);
    } else {
      acc[category.id] = categoryWithChildren;
    }

    return acc;
  }, {});
  return categoriesMap || {};
};

export const flatAttributes = (types?: ProductType[]) => types?.map((type) => type.attributes || []).flat();

const mapAttributesWithValues = (attributes?: AttributeDefinition[], facets?: FacetResults) => {
  if (!attributes || !facets) {
    return [];
  }

  const allAttributes = Object.entries(facets).map(([key, value]) => {
    const attribute = attributes.find((attribute) => attribute.name && key.includes(attribute.name));
    return {
      key: attribute?.name || 'price',
      label: attribute?.label[LANG] || 'Price',
      ...(value.type === 'range' && {
        max: attribute?.name ? value.ranges[0].max : switchPrice(value.ranges[0].max, {}),
      }),
      ...(value.type === 'terms' && { terms: [...value.terms] }),
    };
  });

  return allAttributes as FilterAttribute[];
};

const findAttribute = (key: FilterKey, attributes: FilterAttribute[]) =>
  attributes.find((attr) => attr.key === key) || { key, label: key };

export const mapAttributes = (attributes?: AttributeDefinition[], facets?: FacetResults) => {
  const allAttributes = mapAttributesWithValues(attributes, facets);
  return {
    price: findAttribute('price', allAttributes),
    color: findAttribute('color', allAttributes),
    brand: findAttribute('brand', allAttributes),
    dimension: allAttributes.filter((attr): attr is FilterAttribute => ['width', 'height', 'depth'].includes(attr.key)),
  };
};

export const getCategoryIdFromPath = (pathname: string, categories?: Category[]) => {
  const segmentsBeforeCategories = 2;
  const segments = pathname.split('/').slice(segmentsBeforeCategories);
  if (!segments.length) {
    return '';
  }

  let id: string | null = null;

  for (const segment of segments) {
    const category = categories?.find((category) => category.key === segment);
    if (!category) {
      id = null;
      break;
    }
    id = category.id;
  }

  return id;
};

export const mapPrices = (prices?: Price[]) => {
  if (!prices?.length) {
    return { itemPrice: 0, itemDiscountedPrice: undefined, discountPercent: undefined, hasDiscount: false };
  }

  const { value, discounted } = prices[0];
  const MULTIPLIER = 100;

  const itemPrice = switchPrice(value.centAmount, { fractionDigits: value.fractionDigits });
  let itemDiscountedPrice;
  let discountPercent;

  if (discounted) {
    itemDiscountedPrice = switchPrice(discounted.value.centAmount, { fractionDigits: discounted.value.fractionDigits });
    discountPercent = Math.round(((itemPrice - itemDiscountedPrice) / itemPrice) * MULTIPLIER);
  }

  return { itemPrice, itemDiscountedPrice, discountPercent, hasDiscount: !!discounted };
};
