/* eslint-disable no-restricted-imports */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { FormInput } from '@/components/input/input';
import { Button, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useToast } from '@/context/toast-provider';
import { useToken } from '@/context/token-context';
import { profileSchema, ProfileFormInputs } from '@/validation/profile-validation';
import { fetchFromApi } from '@/api/platformApi';
import type { Customer } from '@commercetools/platform-sdk';
import { PasswordChangeDialog } from './password-modal';
import styles from './profile.module.scss';
import { SUCCESS_MESSAGES } from '@/utils/constants/messages';

export function Profile() {
  const { token } = useToken();
  const { showToast } = useToast();

  const [editableSections, setEditableSections] = useState<Record<string, boolean>>({});
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const enableSection = (section: string) => setEditableSections((prev) => ({ ...prev, [section]: true }));

  const disableSection = (section: string) =>
    setEditableSections((prev) => {
      const updated = { ...prev };
      delete updated[section];
      return updated;
    });

  const isEditable = (section: string) => !!editableSections[section];

  const { handleSubmit, control, reset } = useForm<ProfileFormInputs>({
    defaultValues: {
      customerData: {
        email: '',
        firstName: '',
        lastName: '',
        dateOfBirth: '',
      },
    },
    resolver: zodResolver(profileSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const data = await fetchFromApi<Customer>('/me', token);

        reset({
          customerData: {
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            dateOfBirth: data.dateOfBirth,
          },
        });
      } catch {
        showToast({ message: 'Something went wrong. Please try later.', isError: true });
      }
    };

    fetchCustomer();
  }, [reset, showToast, token]);

  const handleProfileUpdate = async (data: ProfileFormInputs) => {
    const freshCustomer = await fetchFromApi<Customer>('/me', token);

    const actions = [
      { action: 'changeEmail', email: data.customerData.email },
      { action: 'setFirstName', firstName: data.customerData.firstName },
      { action: 'setLastName', lastName: data.customerData.lastName },
      { action: 'setDateOfBirth', dateOfBirth: data.customerData.dateOfBirth },
    ];

    const updatedCustomer = await fetchFromApi<Customer>('/me', token, {
      method: 'POST',
      body: JSON.stringify({ version: freshCustomer.version, actions }),
    });

    return updatedCustomer;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: handleProfileUpdate,
    onSuccess: () => {
      disableSection('personal');
      showToast({ message: SUCCESS_MESSAGES.PROFILE });
    },
    onError: (err) => {
      showToast({ message: err.message, isError: true });
    },
  });

  const onSubmit = handleSubmit((data: ProfileFormInputs) => {
    mutate(data);
  });

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className={styles.actionsContainer}>
          <Button variant="outlined" onClick={() => setShowPasswordModal(true)}>
            Change password
          </Button>
        </div>

        <Typography variant="h6">
          Personal info
          <IconButton onClick={() => enableSection('personal')}>
            <EditIcon />
          </IconButton>
        </Typography>

        <div>
          <FormInput
            type="text"
            name={'customerData.email'}
            control={control}
            label="Email"
            fullWidth
            isDisabled={!isEditable('personal')}
          />
          <FormInput
            type="text"
            name={'customerData.firstName'}
            control={control}
            label="First Name"
            fullWidth
            isDisabled={!isEditable('personal')}
          />
          <FormInput
            type="text"
            name={'customerData.lastName'}
            control={control}
            label="Last Name"
            fullWidth
            isDisabled={!isEditable('personal')}
          />
          <FormInput
            type="date"
            name={'customerData.dateOfBirth'}
            control={control}
            label="Date of Birth"
            fullWidth
            isDisabled={!isEditable('personal')}
          />
        </div>

        {isEditable('personal') && (
          <div className={styles.buttonsWrapper}>
            <Button type="submit" disabled={isPending} className={styles.submitButton}>
              Save changes
            </Button>
            <Button
              onClick={() => {
                reset();
                disableSection('personal');
              }}
              className={styles.cancelButton}
            >
              Cancel
            </Button>
          </div>
        )}
      </form>

      <PasswordChangeDialog open={showPasswordModal} onClose={() => setShowPasswordModal(false)} />
    </>
  );
}
