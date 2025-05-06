import type { ErrorResponse } from '@commercetools/platform-sdk';
import { SERVER_ERROR_CODE } from '@/utils/constants/api';

export const mapApiErrorToMessage = (error: ErrorResponse): never => {
  if (error.statusCode >= SERVER_ERROR_CODE) {
    throw new Error('Something went wrong on our side. Please try again later.');
  }

  const errorCode = error.errors?.[0]?.code;

  switch (errorCode) {
    // ↓ when registering already registered user ↓
    case 'DuplicateField':
      throw new Error('User with this email already exists');
    // ↓ when registering user with empty password ↓
    case 'RequiredField':
      throw new Error('Empty password');
    // ↓ when logging in with incorrect credentials ↓
    case 'InvalidCredentials':
      throw new Error('Incorrect email or password');
    // ↓ when logging in with invalid token ↓
    case 'invalid_token':
      throw new Error('Token invalid.');
    default:
      throw new Error(`Unknown Error: ${error.errors?.[0]?.message || error.message}`);
  }
};
