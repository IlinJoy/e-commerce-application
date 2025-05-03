import { PROJECT_KEY } from '../utils/constants'
import { apiRoot } from './platformApi'

export const getProducts = async () => {
  const response = await apiRoot
    .withProjectKey({ projectKey: PROJECT_KEY })
    .productProjections()
    .get({
      queryArgs: {
        limit: 20,
      },
    })
    .execute()

  return response.body.results
}
