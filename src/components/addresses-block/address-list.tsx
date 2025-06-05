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

  const getDefaultAddressAction = (actions: MyCustomerUpdateAction[], data: Addresses, id?: string) => {
    const defaultAddressAction: MyCustomerUpdateAction[] = [];
    if (type === 'Billing' ? data.billingDefaultAddress : data.shippingDefaultAddress) {
      defaultAddressAction.push({ action: `setDefault${type}Address`, addressId: id });
    }
    return [...actions, ...defaultAddressAction];
  };

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
    const actionsWithDefault = getDefaultAddressAction(actions, data, newAddress?.id);
    return await updateCustomer(token, { version: result.version, actions: actionsWithDefault });
  };

  const changeAddress = async ({ data, id }: { data: Addresses; id?: string }) => {
    const actions: MyCustomerUpdateAction[] = [{ action: `changeAddress`, addressId: id, address: data }];
    const actionsWithDefault = getDefaultAddressAction(actions, data, id);
    return await handleUpdateAddress(actionsWithDefault);
  };

  return (
    <div>
      {addresses?.map((addr) => {
        return (
          <AddressBlockForm
            key={addr.id}
            address={addr}
            type={type}
            isDefault={addr.id === defaultAddressId}
            onRemove={removeAddress}
            onSubmit={changeAddress}
          />
        );
      })}

      {isNew && (
        <AddressBlockForm type={type} onRemove={removeAddress} onSubmit={addAddress} isNew setIsNew={setIsNew} />
      )}
      {!isNew && <Button onClick={() => setIsNew(true)}>Add Address</Button>}
    </div>
  );
}
