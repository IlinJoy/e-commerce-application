import { fetchFromApi } from '@/api/platformApi';
import { getRequestToken } from '@/utils/request-token-handler';
import type { Category, ProductProjection, ProductType } from '@commercetools/platform-sdk';

export const getProducts = async (): Promise<ProductProjection[]> => {
  const token = getRequestToken();
  const result = await fetchFromApi<{ results: ProductProjection[] }>('/product-projections', token);
  return result.results;
};

export const getCategories = async () => {
  const token = getRequestToken();
  const result = await fetchFromApi<{ results: Category[] }>('/categories', token);
  return result.results;
};

export const getProductsWithFilters = async (filterString: string): Promise<ProductProjection[]> => {
  const token = getRequestToken();
  const result = await fetchFromApi<{ results: ProductProjection[] }>(`/product-projections${filterString}`, token);
  return result.results;
};
