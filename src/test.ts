import { getProducts } from './api/catalog.js';
import { registerCustomer, loginCustomer } from './api/clientAuth.js';
import { createCartForCustomer } from './api/createCartForCustomer.js';
import { addProductToCart } from './api/addProductToCart.js';
import type { Customer, ProductProjection } from '@commercetools/platform-sdk';
import { createOrderFromCart } from './api/createOrderFromCart.js';
import { getCustomerOrders } from './api/getCustomerOrders.js';

// usage example:
// const handleClick = async () => {
//   await run()
// };
// return <button onClick={() => void handleClick()}>I'm App!</button>
// runs the whole flow: registering, authentication, getting products, creating a cart & an order, getting all user's orders
export const run = async (): Promise<void> => {
  try {
    const timestamp = Date.now();
    const email = `test${timestamp}@example.com`;
    const password = 'Test123!';

    const registered = await registerCustomer({
      customerData: {
        email,
        password,
        firstName: 'Test',
        lastName: 'User',
      },
      shippingAddress: {
        country: 'US',
        streetName: 'Mockingbird Lane',
        streetNumber: '123',
        postalCode: '10001',
        city: 'New York',
      },
      billingAddress: {
        country: 'US',
        streetName: 'Elm Street',
        streetNumber: '456',
        postalCode: '90001',
        city: 'Los Angeles',
      },
      useSameAddress: false,
    });

    if (!registered) {
      throw new Error('Customer registration failed');
    }

    console.log('Customer registered:', registered);

    const loginRes = await loginCustomer(email, password);
    const customer = loginRes?.customer as Customer | undefined;

    if (!customer) {
      throw new Error('Login failed');
    }

    console.log('Customer logged in:', customer);

    const products = await getProducts();
    if (!products.length) {
      throw new Error('No products found');
    }

    const product = products[0] as ProductProjection;
    const variantId = product.masterVariant?.id;
    if (!variantId) {
      throw new Error('Product is missing master variant ID');
    }

    console.log('Product fetched: ', product);

    const shippingAddress = customer.addresses?.[0];
    if (!shippingAddress) {
      throw new Error('Shipping address is missing');
    }

    const customerCart = await createCartForCustomer({
      email,
      password,
      shippingAddress,
    });

    console.log('Cart created: ', customerCart);

    const updatedCart = await addProductToCart({
      cartId: customerCart.id,
      cartVersion: customerCart.version,
      productId: product.id,
      variantId,
      quantity: 1,
    });

    console.log('Added product to cart:', updatedCart);

    const order = await createOrderFromCart({
      cartId: updatedCart.id,
      cartVersion: updatedCart.version,
      email,
      password,
    });

    console.log('Order created: ', order);

    const customerOrders = await getCustomerOrders(email, password);

    console.log('All customer orders: ', customerOrders);
  } catch (error) {
    console.error('Error during full test:', error instanceof Error ? error.message : error);
  }
};
