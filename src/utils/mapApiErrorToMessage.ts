import type { ErrorResponse } from '@commercetools/platform-sdk';
import { SERVER_ERROR_CODE } from '@/utils/constants/api';

export const mapApiErrorToMessage = (error: ErrorResponse): never => {
  if (error.statusCode >= SERVER_ERROR_CODE) {
    throw new Error('Something went wrong on our side. Please try again later.');
  }

  switch (error.message) {
    // ↓ when registering already registered user ↓
    case 'There is already an existing customer with the provided email.':
      throw new Error('User with this email already exists');
    // ↓ when registering user with empty password ↓
    case `'password' should not be empty.`:
      throw new Error('Empty password');
    // ↓ when logging in with incorrect credentials ↓
    case 'Customer account with the given credentials not found.':
      throw new Error('Incorrect email or password');
    // ↓ when logging in with invalid token ↓
    case 'invalid_token':
      throw new Error('Token invalid.');
    default:
      throw new Error(`Unknown Error: ${error.message}`);
  }
};
