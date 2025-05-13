import { getProducts } from './api/catalog.js';
import { registerCustomer, loginCustomer } from './api/clientAuth.js';
import { createCartForCustomer } from './api/createCartForCustomer.js';
import { addProductToCart } from './api/addProductToCart.js';
import { createOrderFromCart } from './api/createOrderFromCart.js';
import { getCustomerOrders } from './api/getCustomerOrders.js';
import { getAnonymousToken } from './api/platformApi.js';

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
    const anonymousId = `anon-${timestamp}`;

    const anonymousToken = await getAnonymousToken(anonymousId);

    const registered = await registerCustomer(anonymousToken, {
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
    if (!loginRes) {
      throw new Error('Login failed');
    }

    const { customer, customerToken } = loginRes;

    if (!customer) {
      throw new Error('Login failed');
    }

    console.log('Customer logged in:', customer);

    if (!customerToken) {
      throw new Error('Customer token is missing');
    }

    const products = await getProducts(customerToken);
    if (!products.length) {
      throw new Error('No products found');
    }

    const product = products[0];
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
      token: customerToken,
      shippingAddress,
    });

    console.log('Cart created: ', customerCart);

    const updatedCart = await addProductToCart({
      token: customerToken,
      cartId: customerCart.id,
      cartVersion: customerCart.version,
      productId: product.id,
      variantId,
      quantity: 1,
    });

    console.log('Added product to cart:', updatedCart);

    // const anonymousCart = await createCartForCustomer({
    //   token: anonymousToken,
    //   shippingAddress: {
    //     country: 'US',
    //     streetName: 'Mockingbird Lane',
    //     streetNumber: '123',
    //     postalCode: '10001',
    //     city: 'New York',
    //   },
    // });

    // console.log('Anonymous cart created: ', anonymousCart);

    // const updatedAnonCart = await addProductToCart({
    //   token: anonymousToken,
    //   cartId: anonymousCart.id,
    //   cartVersion: anonymousCart.version,
    //   productId: product.id,
    //   variantId,
    //   quantity: 1,
    // });

    // console.log('Added product to anonymous cart:', updatedAnonCart);

    const order = await createOrderFromCart({
      token: customerToken,
      cartId: updatedCart.id,
      cartVersion: updatedCart.version,
    });

    console.log('Order created: ', order);

    const customerOrders = await getCustomerOrders(customerToken);

    console.log('All customer orders: ', customerOrders);
  } catch (error) {
    console.error('Error during full test:', error instanceof Error ? error.message : error);
  }
};
