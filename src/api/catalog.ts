import { fetchFromApi } from '@/api/platformApi';
import { getRequestToken } from '@/utils/request-token-handler';
import type { Category, ProductProjection } from '@commercetools/platform-sdk';

export const getProducts = async (token: string): Promise<ProductProjection[]> => {
  const result = await fetchFromApi<{ results: ProductProjection[] }>('/product-projections', token);
  return result.results;
};

export const getCategories = async () => {
  const token = getRequestToken();
  const result = await fetchFromApi<{ results: Category[] }>('/categories', token);
  return result.results;
};
