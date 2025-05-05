import 'dotenv/config';
import { registerCustomer, loginCustomer } from './api/clientAuth.js';
import { getProducts } from './api/catalog.js';
import { createCartForCustomer } from './api/createCartForCustomer.js';
import { addProductToCart } from './api/addProductToCart.js';
import { createOrderFromCart } from './api/createOrderFromCart.js';
import { getCustomerOrders } from './api/getCustomerOrders.js';

const run = async () => {
  try {
    const timestamp = Date.now();
    const email = `test${timestamp}@example.com`;
    const password = 'Test123!';

    // Регистрируем пользователя
    const customer = await registerCustomer({
      email,
      password,
      firstName: 'Test',
      lastName: 'User',
    });
    console.log('Customer registered:', customer);

    // Логинимся
    const { customer: loggedInCustomer } = await loginCustomer(email, password);
    console.log('Logged in! Access token:', '[hidden via SDK v3]', loggedInCustomer);

    // Получаем список продуктов
    const products = await getProducts();
    const firstProduct = products[0];
    if (!firstProduct) {
      throw new Error('Нет доступных продуктов');
    }
    console.log('Получен продукт:', {
      id: firstProduct.id,
      name: firstProduct.name,
      variantId: firstProduct.masterVariant.id,
    });

    // Создаём корзину
    const cart = await createCartForCustomer({
      customerId: customer.customer.id,
      shippingAddress: {
        firstName: 'Test',
        lastName: 'User',
        streetName: 'Main Street',
        postalCode: '12345',
        city: 'New York',
        country: 'US',
      },
    });
    console.log('Cart created:', { id: cart.id, version: cart.version });

    // Добавляем продукт в корзину
    const updatedCart = await addProductToCart({
      cartId: cart.id,
      cartVersion: cart.version,
      productId: firstProduct.id,
      variantId: firstProduct.masterVariant.id,
      quantity: 1,
    });
    console.log('Product added to cart:', updatedCart);

    // Создаём заказ
    const order = await createOrderFromCart({
      cartId: updatedCart.id,
      cartVersion: updatedCart.version,
    });
    console.log('Order created:', order);

    // Получаем заказы пользователя
    const orders = await getCustomerOrders(customer.customer.id);
    console.log('Заказы пользователя:', orders);
  } catch (error) {
    console.error('Error during full test:', error);
  }
};

void run();
