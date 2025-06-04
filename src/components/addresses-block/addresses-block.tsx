import { useCustomerQuery } from '@/hooks/use-customer-query';
import { updateCustomer } from '@/api/update-customer';
import { useToken } from '@/context/token-context';
import type { MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import { getAddresses } from '@/utils/account-utils';
import { AddressList } from './address-list';

export function AddressesBlock() {
  const { data: customer, isFetching } = useCustomerQuery();
  const { token } = useToken();

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (!customer) {
    return <div>No address found</div>;
  }

  const addresses = getAddresses(customer);

  const handleUpdateAddress = async (update: MyCustomerUpdateAction[]) => {
    const result = await updateCustomer(token, { version: customer.version, actions: update });
    return result;
  };

  return (
    <div>
      <AddressList
        type="Shipping"
        addresses={addresses?.shippingAddresses}
        defaultAddressId={customer?.defaultShippingAddressId}
        handleUpdateAddress={handleUpdateAddress}
      />
      <AddressList
        type="Billing"
        addresses={addresses?.billingAddresses}
        defaultAddressId={customer?.defaultShippingAddressId}
        handleUpdateAddress={handleUpdateAddress}
      />
    </div>
  );
}
