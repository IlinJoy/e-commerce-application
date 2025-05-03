import { CustomerDraft } from '@commercetools/platform-sdk'
import { apiRoot } from './platformApi'

export const registerCustomer = async (customerData: CustomerDraft) => {
  const response = await apiRoot
    .withProjectKey({ projectKey: process.env.CTP_PROJECT_KEY! })
    .customers()
    .post({ body: customerData })
    .execute()

  return response.body
}
