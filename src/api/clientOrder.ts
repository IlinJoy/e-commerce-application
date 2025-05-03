// accessToken is ADMIN TOKEN (adminToken.ts)
// customerId can be obtained from registerCustomer or loginCustomer
const createCartForCustomer = async ({
  accessToken,
  customerId,
  shippingAddress
}: {
  accessToken: string;
  customerId: string;
  shippingAddress: {
    firstName: string;
    lastName: string;
    streetName: string;
    postalCode: string;
    city: string;
    country: string;
  }
}) => {
  const response = await fetch(
    "https://api.us-central1.gcp.commercetools.com/frontend-first-project/carts",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        currency: "USD",
        customerId: customerId,
        shippingAddress: shippingAddress
      })
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Cart creation failed");
  }

  return data; // contains cartId & version (are needed to add products to cart)
};

// accessToken is ADMIN TOKEN (adminToken.ts)
const addProductToCart = async ({
  cartId,
  cartVersion,
  productId,
  variantId,
  quantity,
  accessToken,
}) => {
  const response = await fetch(
    `https://api.us-central1.gcp.commercetools.com/frontend-first-project/carts/${cartId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: cartVersion,
        actions: [
          {
            action: "addLineItem",
            productId,
            variantId,
            quantity,
          },
        ],
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Add to cart failed");
  }

  return data;
};

// accessToken is ADMIN TOKEN (adminToken.ts)
const createOrderFromCart = async ({
  cartId,
  cartVersion,
  accessToken,
}: {
  cartId: string;
  cartVersion: number;
  accessToken: string;
}) => {
  const response = await fetch(
    `https://api.us-central1.gcp.commercetools.com/frontend-first-project/orders`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: cartId,
        version: cartVersion,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Order creation failed");
  }

  return data;
};

// accessToken is ADMIN TOKEN (adminToken.ts)
const getCustomerOrders = async ({
  accessToken,
  customerId,
}: {
  accessToken: string;
  customerId: string;
}) => {
  const encodedWhere = encodeURIComponent(`customerId="${customerId}"`);
  const response = await fetch(
    `https://api.us-central1.gcp.commercetools.com/frontend-first-project/orders?where=${encodedWhere}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Fetching customer orders failed");
  }

  return data;
  // orders will be here: data/results/ (array of objects)
};
