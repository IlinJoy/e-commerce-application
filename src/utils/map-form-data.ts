import type { RegisterCustomerOptions } from '@/api/clientAuth';
import type { RegisterFormInputs } from '@/validation/registration-validation';

export const mapRegistrationFormData = (data: RegisterFormInputs) => {
  const { sameAddress, billingDefaultAddress, shippingDefaultAddress } = data;

  const result: RegisterCustomerOptions = {
    customerData: {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
    },
    shippingAddress: {
      country: data.shippingCountry,
      streetName: data.shippingStreet,
      postalCode: data.shippingPostalCode,
      city: data.shippingCity,
    },
    useSameAddress: sameAddress,
    billingDefaultAddress,
    shippingDefaultAddress,
  };

  if (!sameAddress) {
    result.billingAddress = {
      country: data.billingCountry,
      streetName: data.billingStreet,
      postalCode: data.billingPostalCode,
      city: data.billingCity,
    };
  }

  return result;
};
