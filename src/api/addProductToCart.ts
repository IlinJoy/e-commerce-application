import { PROJECT_KEY } from "../utils/constants"
import { apiRoot } from "./platformApi"

export const addProductToCart = async ({
  cartId,
  cartVersion,
  productId,
  variantId,
  quantity,
}: {
  cartId: string
  cartVersion: number
  productId: string
  variantId: number
  quantity: number
}) => {
  const response = await apiRoot
    .withProjectKey({ projectKey: PROJECT_KEY })
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version: cartVersion,
        actions: [
          {
            action: 'addLineItem',
            productId,
            variantId,
            quantity,
          },
        ],
      },
    })
    .execute()

  return response.body
}
