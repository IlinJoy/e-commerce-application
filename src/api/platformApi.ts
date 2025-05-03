import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'
import ctpClient from './sdkClient'

export const apiRoot = createApiBuilderFromCtpClient(ctpClient)
