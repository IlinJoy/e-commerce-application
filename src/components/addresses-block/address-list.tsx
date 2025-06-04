import Typography from '@mui/material/Typography';
import { AddressBlockForm } from './address-form';
import type { Address, Customer, MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/context/toast-provider';
import { useToken } from '@/context/token-context';
import type { Addresses } from '@/validation/profile-validation';
import { updateCustomer } from '@/api/update-customer';
import { SUCCESS_MESSAGES } from '@/utils/constants/messages';
import { findNewAddress } from '@/utils/account-utils';

type AddressListProps = {
  type: 'Shipping' | 'Billing';
  addresses?: Address[];
  defaultAddressId?: string;
  handleUpdateAddress: (actions: MyCustomerUpdateAction[]) => Promise<Customer>;
};

export function AddressList({ addresses, type, defaultAddressId, handleUpdateAddress }: AddressListProps) {
  const [isNew, setIsNew] = useState(false);
  const { token } = useToken();
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { mutate } = useMutation({
    mutationFn: handleUpdateAddress,
    onSuccess: (data) => {
      queryClient.setQueryData(['customer', token], data);
      showToast({ message: SUCCESS_MESSAGES.DELETE_ADDRESS });
    },
    onError: (err) => {
      showToast({ message: err.message, isError: true });
    },
  });

  const removeAddress = (id?: string) => {
    if (id) {
      mutate([{ action: 'removeAddress', addressId: id }]);
    }
    setIsNew(false);
  };

  const addAddress = async ({ data }: { data: Addresses }) => {
    const result = await handleUpdateAddress([{ action: 'addAddress', address: data }]);
    const newAddress = findNewAddress(result);
    const actions: MyCustomerUpdateAction[] = [{ action: `add${type}AddressId`, addressId: newAddress?.id }];

    if (data.shippingDefaultAddress || data.shippingDefaultAddress) {
      actions.push({ action: `setDefault${type}Address`, addressId: newAddress?.id });
    }
    return await updateCustomer(token, { version: result.version, actions });
  };

  const changeAddress = async ({ data, id }: { data: Addresses; id?: string }) => {
    const actions: MyCustomerUpdateAction[] = [{ action: `changeAddress`, addressId: id, address: data }];
    console.log(data);
    if (data.shippingDefaultAddress || data.shippingDefaultAddress) {
      actions.push({ action: `setDefault${type}Address`, addressId: id });
    }
    console.log(actions);
    return await handleUpdateAddress(actions);
  };

  return (
    <div>
      <Typography variant="h6">{type} Addresses</Typography>
      {addresses?.map((addr) => (
        <AddressBlockForm
          key={addr.id}
          address={addr}
          type={type}
          isDefault={addr.id === defaultAddressId}
          onRemove={removeAddress}
          onSubmit={changeAddress}
        />
      ))}

      {isNew && <AddressBlockForm type={type} onRemove={removeAddress} onSubmit={addAddress} isNew />}
      {!isNew && <Button onClick={() => setIsNew(true)}>Add Address</Button>}
    </div>
  );
}
