import { CustomerDraft, ClientRequest } from '@commercetools/platform-sdk';
import { ctpClient } from './sdkClient.js';
import { PROJECT_KEY } from '../utils/constants.js';

export const registerCustomer = async (customerData: CustomerDraft) => {
  const request: ClientRequest = {
    method: 'POST',
    uri: `/${PROJECT_KEY}/customers`,
    body: customerData,
  };

  const response = await ctpClient.execute(request);
  return response.body;
};
