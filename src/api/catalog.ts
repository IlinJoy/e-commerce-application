import { apiRoot } from './platformApi'

export const getProducts = async () => {
  const response = await apiRoot
    .withProjectKey({ projectKey: process.env.CTP_PROJECT_KEY! })
    .productProjections()
    .get({
      queryArgs: {
        limit: 20,
      },
    })
    .execute()

  return response.body.results
}
