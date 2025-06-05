import { useCustomerQuery } from '@/hooks/use-customer-query';
import { updateCustomer } from '@/api/update-customer';
import { useToken } from '@/context/token-context';
import type { MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import { getAddresses } from '@/utils/account-utils';
import { AddressList } from './address-list/address-list';
import Typography from '@mui/material/Typography';
import styles from './addresses-block.module.scss';

export function AddressesBlock() {
  const { data: customer, isFetching } = useCustomerQuery();
  const { token } = useToken();

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (!customer || !customer.addresses) {
    return <div>No addresses found</div>;
  }

  const addresses = getAddresses(customer);

  const handleUpdateAddress = async (update: MyCustomerUpdateAction[]) => {
    const result = await updateCustomer(token, { version: customer.version, actions: update });
    return result;
  };

  return (
    <div className={styles.listWrapper}>
      <div className={styles.list}>
        <Typography variant="h6">Shipping Addresses</Typography>
        <AddressList
          type="Shipping"
          addresses={addresses.shippingAddresses}
          defaultAddressId={customer.defaultShippingAddressId}
          handleUpdateAddress={handleUpdateAddress}
        />
      </div>

      <div className={styles.list}>
        <Typography variant="h6">Billing Addresses</Typography>
        <AddressList
          type="Billing"
          addresses={addresses.billingAddresses}
          defaultAddressId={customer.defaultBillingAddressId}
          handleUpdateAddress={handleUpdateAddress}
        />
      </div>
    </div>
  );
}
