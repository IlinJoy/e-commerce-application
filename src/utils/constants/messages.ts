export const ERROR_MESSAGES = {
  ENV_NOT_FOUND: (key: string) => `Cannot found env ${key}`,
  SOMETHING_WRONG: 'Something went wrong. Please try again later.',
  REGISTRATION_FAIL: 'An error occurred during registration. Please try later.',
  UPDATE_INFO: 'Could not update information. Please login to proceed.',
  UPDATE_PASSWORD_FAIL: 'Changing password error',
  TOKEN_NOT_FOUND: 'Could not found your personal access token, please register or reload page.',
  CREATE_CART_FAIL: 'Failed to create a cart',
  ADD_PRODUCT_FAIL: 'Failed to add this product to cart!',
  REMOVE_PRODUCT_FAIL: 'Failed to remove this product from cart!',
  QUANTITY_LIMIT: (value: number, limit: number) =>
    `Sorry, you can't add ${value} items. Only ${limit} available right now`,
  PROMO_EXIST: 'This promotion has already been applied',
  CODE_DOEST_MATCH: (code: string) => `The conditions for applying ${code} promo codes are not met.`,
};

export const SUCCESS_MESSAGES = {
  LOGIN: 'Login successful!',
  REGISTRATION: 'Registration successful!',
  DELETE_ADDRESS: 'Delete address successfully',
  UPDATE_ADDRESS: 'The address has been updated',
  PROFILE: 'Your profile updated',
  PASSWORD: 'Password updated',
  ADD_PRODUCT: 'This product added to cart',
  REMOVE_PRODUCT: 'This product has been removed from your cart',
  UPDATE_CART: 'The cart has been updated successfully',
  CODE_COPIED: (code: string) => `The promo code ${code} was copied.`,
};

export const MESSAGES = {
  SEARCHING: ' Partial match suggestions. The full equivalent will be marked by color.',
  PROMO_COPY: 'Click to copy promo code',
  WANT_TO_CLEAR_CART: 'This will permanently remove the selected products. Are you sure you want to continue?',
};
