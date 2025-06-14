export const ERROR_MESSAGES = {
  ENV_NOT_FOUND: (key: string) => `Cannot found env ${key}`,
  LOGIN_FAIL: 'Something went wrong. Please attempt to log in again later.',
  REGISTRATION_FAIL: 'An error occurred during registration. Please try later.',
  UPDATE_INFO: 'Could not update information. Please login to proceed.',
  UPDATE_PASSWORD_FAIL: 'Changing password error',
  TOKEN_NOT_FOUND: 'Could not found your personal access token, please register or reload page.',
  CREATE_CART_FAIL: 'Failed to create a cart',
  ADD_PRODUCT_FAIL: 'Failed to add this product to cart!',
  REMOVE_PRODUCT_FAIL: 'Failed to remove this product from cart!',
  QUANTITY_LIMIT: (value: number, limit: number) =>
    `Sorry, you can't add ${value} items. Only ${limit} available right now`,
};

export const SUCCESS_MESSAGES = {
  LOGIN: 'Login successful!',
  REGISTRATION: 'Registration successful!',
  DELETE_ADDRESS: 'Delete address successfully',
  UPDATE_ADDRESS: 'The address has been updated',
  PROFILE: 'Your profile updated',
  PASSWORD: 'Password updated',
  SEARCHING: ' Partial match suggestions. The full equivalent will be marked by color.',
  ADD_PRODUCT: 'This product added to cart',
  REMOVE_PRODUCT: 'This product has been removed from your cart',
  CLEAR_CART: 'The card has been cleared successfully',
};
