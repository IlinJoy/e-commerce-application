import type { FilterValues } from '@/components/catalog-filters/catalog-filters';
import type { Category, Price } from '@commercetools/platform-sdk';

export type CategoryWithChildren = Category & { children: CategoryWithChildren[] };

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

const calculatePrice = (cents: number, fractionDigits: number) => {
  const POW_BASE = 10;
  return cents / POW_BASE ** fractionDigits;
};

export const mapPrices = (prices?: Price[]) => {
  if (!prices?.[0]) {
    return { itemPrice: 0, itemDiscountedPrice: undefined, discountPercent: undefined, hasDiscount: false };
  }

  const { value, discounted } = prices[0];
  const MULTIPLIER = 100;

  const itemPrice = calculatePrice(value.centAmount, value.fractionDigits);
  let itemDiscountedPrice;
  let discountPercent;

  if (discounted) {
    itemDiscountedPrice = calculatePrice(discounted.value.centAmount, discounted.value.fractionDigits);
    discountPercent = Math.round(((itemPrice - itemDiscountedPrice) / itemPrice) * MULTIPLIER);
  }

  return { itemPrice, itemDiscountedPrice, discountPercent, hasDiscount: !!discounted };
};

export const createFilterString = ({ category }: Partial<FilterValues> & { category?: string }) => {
  const result = [];

  if (category) {
    result.push(`categories.id:"${category}"`);
  }

  return result.length ? `/search?filter=${result.join(' AND ')}` : '';
};
