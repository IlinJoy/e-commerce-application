import { PROJECT_KEY } from '../utils/constants.js';
import { ctpClient } from './sdkClient.js';
import {
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';

export const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: PROJECT_KEY });
