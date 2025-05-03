import { apiRoot } from "./platformApi"

export const getCustomerOrders = async (customerId: string) => {
  const response = await apiRoot
    .withProjectKey({ projectKey: process.env.CTP_PROJECT_KEY! })
    .orders()
    .get({
      queryArgs: {
        where: `customerId="${customerId}"`,
      },
    })
    .execute()

  return response.body.results
}
