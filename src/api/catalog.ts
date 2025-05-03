import { ctpClient } from './sdkClient.js';
import { PROJECT_KEY } from '../utils/constants.js';

export const getProducts = async () => {
  const response = await ctpClient.execute({
    method: 'GET',
    uri: `/${PROJECT_KEY}/product-projections`,
    queryArgs: {
      limit: 20,
    },
  });

  return response.body.results;
};
