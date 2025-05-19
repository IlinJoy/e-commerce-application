import { fetchFromApi } from '@/api/platformApi';
import type { ProductProjection } from '@commercetools/platform-sdk';

export const getProducts = async (token: string): Promise<ProductProjection[]> => {
  const result = await fetchFromApi<{ results: ProductProjection[] }>('/product-projections', token);
  return result.results;
};

export const getProductByKey = async (key: string, token: string): Promise<ProductProjection> => {
  const result = await fetchFromApi<ProductProjection>(`/product-projections/key=${key}`, token);
  return result;
};
