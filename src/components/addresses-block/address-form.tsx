import type { Addresses } from '@/validation/profile-validation';
import { addressSchema } from '@/validation/profile-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormInput } from '../input/input';
import { SelectFormInput } from '../select/select';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import { CheckBox } from '../checkbox/checkbox';
import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Customer, MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import type { DefaultValuesProps } from '@/utils/account-utils';
import { getDefaultValues } from '@/utils/account-utils';
import { useCustomerQuery } from '@/hooks/use-customer-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/context/toast-provider';
import { useToken } from '@/context/token-context';
import { SUCCESS_MESSAGES } from '@/utils/constants/messages';

export type AddressFormProps = DefaultValuesProps & {
  // onAdd?: (data: Addresses) => Promise<Customer | undefined>;
  // onChange?: ({ data, id }: { data: Addresses; id?: string }) => Promise<Customer | undefined>;
  onRemove: (id?: string) => void;
  onSubmit: (data: { data: Addresses; id?: string }) => Promise<Customer | undefined>;
  isNew?: boolean;
};

export function AddressBlockForm({ address, type, isDefault, isNew = false, onSubmit, onRemove }: AddressFormProps) {
  const [isDisabled, seIsDisabled] = useState(true);
  const defaultValues = getDefaultValues({ address, type, isDefault });
  const { token } = useToken();
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty },
  } = useForm<Addresses>({
    resolver: zodResolver(addressSchema),
    mode: 'onChange',
    defaultValues,
  });

  const { mutate } = useMutation({
    mutationFn: onSubmit,
    onSuccess: (data) => {
      showToast({ message: SUCCESS_MESSAGES.UPDATE_ADDRESS });
      seIsDisabled(true);
      reset();
      queryClient.setQueryData(['customer', token], data);
    },
    onError: (err) => {
      showToast({ message: err.message, isError: true });
    },
  });

  const shouldDisabled = isDisabled && !isNew;
  const toggleDisable = () => seIsDisabled((prev) => !prev);
  const checkboxName = type === 'Shipping' ? 'shippingDefaultAddress' : 'billingDefaultAddress';

  return (
    <form onSubmit={handleSubmit((data) => mutate({ data, id: address?.id }))}>
      <div>
        <CheckBox name={checkboxName} control={control} label="Default Address" disabled={shouldDisabled} />
        <div>
          {!isNew && (
            <IconButton onClick={toggleDisable}>
              <EditIcon />
            </IconButton>
          )}
          <IconButton onClick={() => onRemove(address?.id)}>
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
      <SelectFormInput name="country" control={control} label="Country" isDisabled={shouldDisabled}>
        <MenuItem value="US">USA</MenuItem>
        <MenuItem value="CN">Canada</MenuItem>
      </SelectFormInput>
      <FormInput name="state" control={control} label="State" isDisabled={shouldDisabled} />
      <FormInput name="streetName" control={control} label="Street" isDisabled={shouldDisabled} />
      <FormInput name="city" control={control} label="City" isDisabled={shouldDisabled} />
      <FormInput name="postalCode" control={control} label="Postal Code" isDisabled={shouldDisabled} />
      {isDirty && (
        <div>
          <Button type="submit">Apply</Button>
          <Button type="reset" onClick={() => reset()}>
            Reset
          </Button>
        </div>
      )}
    </form>
  );
}
