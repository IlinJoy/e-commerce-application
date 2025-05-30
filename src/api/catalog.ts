import { fetchFromApi } from '@/api/platformApi';
import { getRequestToken } from '@/utils/request-token-handler';
import type {
  Category,
  ProductProjection,
  ProductProjectionPagedSearchResponse,
  ProductType,
} from '@commercetools/platform-sdk';

export const getProducts = async (): Promise<ProductProjection[]> => {
  const token = await getRequestToken();
  const result = await fetchFromApi<{ results: ProductProjection[] }>('/product-projections', token);
  return result.results;
};

export const getCategories = async () => {
  const token = await getRequestToken();
  const result = await fetchFromApi<{ results: Category[] }>('/categories', token);
  return result.results;
};

export const getProductsWithFilters = async (queryString: string) => {
  const token = await getRequestToken();
  const result = await fetchFromApi<ProductProjectionPagedSearchResponse>(`/product-projections${queryString}`, token);
  return { result: result.results, facets: result.facets };
};

export const getProductType = async () => {
  const token = await getRequestToken();
  const result = await fetchFromApi<{ results: ProductType[] }>('/product-types', token);
  return result.results;
};
