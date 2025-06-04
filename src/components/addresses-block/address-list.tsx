import Typography from '@mui/material/Typography';
import { AddressBlockForm } from './address-form';
import type { Address, Customer, MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/context/toast-provider';

type AddressListProps = {
  type: 'shipping' | 'billing';
  addresses?: Address[];
  defaultAddressId?: string;
  onSubmit: (actions: MyCustomerUpdateAction[]) => Promise<Customer | undefined>;
};

export function AddressList({ type, addresses, defaultAddressId, onSubmit }: AddressListProps) {
  const [isNew, setIsNew] = useState(false);
  const title = type === 'shipping' ? 'Shipping' : 'Billing';
  const addressType = `${title}Address` as const;
  const actions: MyCustomerUpdateAction[] = [];
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const handleRemove = (id?: string) => {
    if (id) {
      actions.push({ action: 'removeAddress', addressId: id });
    } else {
      setIsNew(false);
    }
  };

  const { mutate } = useMutation({
    mutationFn: onSubmit,
    onSuccess: (data) => {
      queryClient.setQueryData(['customer'], data);
      showToast({ message: 'The profile updated' });
    },
    onError: (err) => {
      showToast({ message: err.message, isError: true });
    },
  });

  return (
    <div>
      <Typography variant="h6">{title} Addresses</Typography>
      {addresses?.map((addr) => (
        <AddressBlockForm
          key={addr.id}
          actions={actions}
          address={addr}
          type={addressType}
          isDefault={addr.id === defaultAddressId}
          onRemove={() => handleRemove(addr.id)}
          onSubmit={() => mutate(actions)}
        />
      ))}

      {isNew && (
        <AddressBlockForm
          actions={actions}
          type={addressType}
          onRemove={() => handleRemove()}
          onSubmit={() => mutate(actions)}
          isNew
        />
      )}
      {!isNew && <Button onClick={() => setIsNew(true)}>Add Address</Button>}
    </div>
  );
}
