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
  const handleAddressUpdate = async (actions: MyCustomerUpdateAction[]) => {
    if (customer) {
      return updateCustomer(token, { version: customer.version, actions });
    }
  };

  return (
    <div>
      <AddressList
        type="shipping"
        addresses={addresses?.shippingAddresses}
        defaultAddressId={customer?.defaultShippingAddressId}
        onSubmit={handleAddressUpdate}
      />
      <AddressList
        type="billing"
        addresses={addresses?.shippingAddresses}
        defaultAddressId={customer?.defaultShippingAddressId}
        onSubmit={handleAddressUpdate}
      />
    </div>
  );
}
