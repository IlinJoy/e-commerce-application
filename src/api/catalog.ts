import { apiRoot } from './platformApi';

export const getProducts = async () => {
  const response = await apiRoot.productProjections().get().execute();

  return response.body.results;
};
