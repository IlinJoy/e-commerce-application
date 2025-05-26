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

const calculatePrice = (cents: number, fractionDigits: number) => {
  const POW_BASE = 10;
  return cents / POW_BASE ** fractionDigits;
};

export const mapPrices = (prices: Price[]) => {
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
