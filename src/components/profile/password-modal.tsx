/* eslint-disable no-restricted-imports */
import { Dialog, DialogContent, Typography, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { PasswordInputs } from '@/validation/profile-validation';
import { passwordSchema } from '@/validation/profile-validation';
import { FormInput } from '@/components/input/input';
import { fetchFromApi, getCustomerToken } from '@/api/platformApi';
import { useToast } from '@/context/toast-provider';
import { useToken } from '@/context/token-context';
import type { Customer } from '@commercetools/platform-sdk';
import styles from './profile.module.scss';

type Props = {
  open: boolean;
  onClose: () => void;
};

export const PasswordChangeDialog = ({ open, onClose }: Props) => {
  const { token, updateToken } = useToken();
  const { showToast } = useToast();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<PasswordInputs>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
    },
    resolver: zodResolver(passwordSchema),
    mode: 'onChange',
  });

  const handlePasswordUpdate = async (data: PasswordInputs) => {
    try {
      const customer = await fetchFromApi<Customer>('/me', token);

      await fetchFromApi<Customer>('/me/password', token, {
        method: 'POST',
        body: JSON.stringify({
          id: customer.id,
          version: customer.version,
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        }),
      });

      const newToken = await getCustomerToken(customer.email, data.newPassword);
      updateToken(newToken);
      showToast({ message: 'Password updated' });
      onClose();
    } catch {
      showToast({ message: 'Changing password error', isError: true });
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent className={styles.dialogContent}>
        <form onSubmit={handleSubmit(handlePasswordUpdate)}>
          <Typography variant="h6">Change your password</Typography>

          <FormInput type="password" label="Current password" name="currentPassword" control={control} fullWidth />
          <FormInput type="password" label="New password" name="newPassword" control={control} fullWidth />
          <div className={styles.buttonsWrapper}>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={!isValid}>
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
