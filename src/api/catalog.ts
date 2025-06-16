import { fetchFromApi } from '@/api/platformApi';
import { getRequestToken } from '@/utils/request-token-handler';
import type {
  Category,
  ProductProjection,
  ProductProjectionPagedSearchResponse,
  ProductType,
} from '@commercetools/platform-sdk';

export const getProductByKey = async (key: string): Promise<ProductProjection> => {
  const token = await getRequestToken();
  const result = await fetchFromApi<ProductProjection>(`/product-projections/key=${key}`, token);
  return result;
};

export const getCategories = async () => {
  const token = await getRequestToken();
  const result = await fetchFromApi<{ results: Category[] }>('/categories', token);
  return result.results;
};

export const getProductsWithFilters = async (queryString: string) => {
  const token = await getRequestToken();
  const result = await fetchFromApi<ProductProjectionPagedSearchResponse>(`/product-projections${queryString}`, token);
  return { result: result.results, facets: result.facets, total: result.total };
};

export const getProductType = async () => {
  const token = await getRequestToken();
  const result = await fetchFromApi<{ results: ProductType[] }>('/product-types', token);
  return result.results;
};
