import { fetchFromApi, getAdminToken } from '@/api/platformApi';

type ProductProjection = {
  id: string;
  name: Record<string, string>;
  slug: Record<string, string>;
};

export const getProducts = async (): Promise<ProductProjection[]> => {
  const token = await getAdminToken();
  const result = await fetchFromApi<{ results: ProductProjection[] }>('product-projections', token);
  return result.results;
};
