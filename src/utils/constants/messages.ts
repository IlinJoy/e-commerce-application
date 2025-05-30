export const ERROR_MESSAGES = {
  ENV_NOT_FOUND: (key: string) => `Cannot found env ${key}`,
  LOGIN_FAIL: 'Something went wrong. Please attempt to log in again later.',
  REGISTRATION_FAIL: 'An error occurred during registration. Please try later.',
  UPDATE_INFO: 'Could not update information. Please login to proceed.',
  TOKEN_NOT_FOUND: 'Could not found your personal access token, please register.',
  INVALID_DATA: `Not a valid format for data`,
};

export const SUCCESS_MESSAGES = {
  LOGIN: 'Login successful!',
  REGISTRATION: 'Registration successful!',
};
