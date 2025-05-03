import { PROJECT_KEY } from '../utils/constants'
import { apiRoot } from './platformApi'

type CreateCartParams = {
  customerId: string
  shippingAddress: {
    firstName: string
    lastName: string
    streetName: string
    postalCode: string
    city: string
    country: string
  }
}

export const createCartForCustomer = async ({ customerId, shippingAddress }: CreateCartParams) => {
  const response = await apiRoot
    .withProjectKey({ projectKey: PROJECT_KEY })
    .carts()
    .post({
      body: {
        currency: 'USD',
        customerId,
        shippingAddress,
      },
    })
    .execute()

  return response.body
}
