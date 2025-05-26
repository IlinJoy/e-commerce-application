import type { Category } from '@commercetools/platform-sdk';

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
