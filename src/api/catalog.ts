import { fetchFromApi, getAdminToken } from '@/api/platformApi';
import type { ProductProjection } from '@commercetools/platform-sdk';

export const getProducts = async (): Promise<ProductProjection[]> => {
  const token = await getAdminToken();
  const result = await fetchFromApi<{ results: ProductProjection[] }>('product-projections/', token);
  return result.results;
};
