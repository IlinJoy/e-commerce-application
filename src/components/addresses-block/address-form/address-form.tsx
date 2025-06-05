import type { Addresses } from '@/validation/profile-validation';
import { singleAddressSchema } from '@/validation/profile-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormInput } from '../../input/input';
import { SelectFormInput } from '../../select/select';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import { CheckBox } from '../../checkbox/checkbox';
import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Customer } from '@commercetools/platform-sdk';
import type { DefaultValuesProps } from '@/utils/account-utils';
import { getDefaultValues } from '@/utils/account-utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/context/toast-provider';
import { useToken } from '@/context/token-context';
import { SUCCESS_MESSAGES } from '@/utils/constants/messages';
import styles from './address-form.module.scss';

export type AddressFormProps = DefaultValuesProps & {
  onRemove: (id?: string) => void;
  onSubmit: (data: { data: Addresses; id?: string }) => Promise<Customer | undefined>;
  isNew?: boolean;
  setIsNew?: Dispatch<SetStateAction<boolean>>;
};

export function AddressBlockForm({
  address,
  type,
  isDefault,
  isNew = false,
  onSubmit,
  onRemove,
  setIsNew,
}: AddressFormProps) {
  const [isDisabled, seIsDisabled] = useState(true);
  const { token } = useToken();
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty },
  } = useForm<Addresses>({
    resolver: zodResolver(singleAddressSchema),
    mode: 'onChange',
    defaultValues: getDefaultValues({ address, type, isDefault }),
  });

  useEffect(() => {
    reset({ ...getDefaultValues({ address, type, isDefault }) });
  }, [address, isDefault, reset, type]);

  const { mutate } = useMutation({
    mutationFn: onSubmit,
    onSuccess: (data) => {
      showToast({ message: SUCCESS_MESSAGES.UPDATE_ADDRESS });
      seIsDisabled(true);
      setIsNew?.(false);
      queryClient.setQueryData(['customer', token], data);
    },
    onError: (err) => {
      showToast({ message: err.message, isError: true });
    },
  });

  const handleReset = () => {
    seIsDisabled(false);
    reset();
  };

  const shouldDisabled = isDisabled && !isNew;
  const toggleDisable = () => seIsDisabled((prev) => !prev);
  const checkboxName = type === 'Shipping' ? 'shippingDefaultAddress' : 'billingDefaultAddress';

  return (
    <form className={styles.form} onSubmit={handleSubmit((data) => mutate({ data, id: address?.id }))}>
      <div className={styles.formHeading}>
        <CheckBox name={checkboxName} control={control} label="Default Address" disabled={shouldDisabled} />
        <div className={styles.formHeadingButtons}>
          {!isNew ? (
            <IconButton onClick={toggleDisable}>
              <EditIcon />
            </IconButton>
          ) : (
            <span>New Address</span>
          )}
          <IconButton onClick={() => onRemove(address?.id)}>
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
      <SelectFormInput name="country" control={control} label="Country" isDisabled={shouldDisabled}>
        <MenuItem value="US"> USA</MenuItem>
        <MenuItem value="CN">Canada</MenuItem>
      </SelectFormInput>
      <FormInput name="state" control={control} label="State" isDisabled={shouldDisabled} fullWidth />
      <FormInput name="city" control={control} label="City" isDisabled={shouldDisabled} fullWidth />
      <FormInput name="streetName" control={control} label="Street" isDisabled={shouldDisabled} fullWidth />

      <FormInput name="postalCode" control={control} label="Postal Code" isDisabled={shouldDisabled} fullWidth />
      {isDirty && (
        <div className={styles.buttonWrapper}>
          <Button type="submit">Save Changes</Button>
          <Button type="reset" onClick={handleReset}>
            Cancel
          </Button>
        </div>
      )}
    </form>
  );
}
