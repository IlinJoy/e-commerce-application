import { PROJECT_KEY } from "../utils/constants"
import { apiRoot } from "./platformApi"

export const createOrderFromCart = async ({
  cartId,
  cartVersion,
}: {
  cartId: string
  cartVersion: number
}) => {
  const response = await apiRoot
    .withProjectKey({ projectKey: PROJECT_KEY })
    .orders()
    .post({
      body: {
        id: cartId,
        version: cartVersion,
      },
    })
    .execute()

  return response.body
}
