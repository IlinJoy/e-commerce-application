/* eslint-disable no-restricted-imports */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import { FormInput } from '@/components/input/input';
import { SelectFormInput } from '@/components/select/select';
import { Button, Dialog, DialogContent, IconButton, MenuItem, Typography } from '@mui/material';
import { Control, useFieldArray, useForm } from 'react-hook-form';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { PasswordChangeInputs, passwordSchema, ProfileFormInputs } from '@/validation/profile-validation';
import { CheckBox } from '../checkbox/checkbox';
import { zodResolver } from '@hookform/resolvers/zod';
import { fetchFromApi, getCustomerToken } from '@/api/platformApi';
import { Customer } from '@commercetools/platform-sdk';
import { useToast } from '@/context/toast-provider';
import { useToken } from '@/context/token-context';

type AccountFormProps = {
  onSubmit: () => void;
  isSubmitting: boolean;
  isValidForm: boolean;
  control: Control<ProfileFormInputs>;
  isDirty: boolean;
};

export const AccountForm = ({ onSubmit, control }: AccountFormProps) => {
  const [editableSections, setEditableSections] = useState<Record<string, boolean>>({});
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const enableSection = (section: string) => {
    setEditableSections((prev) => ({ ...prev, [section]: true }));
  };

  const isEditable = (section: string) => !!editableSections[section];
  const {
    fields: shippingFields,
    append: appendShipping,
    remove: removeShipping,
  } = useFieldArray({
    control,
    name: 'shippingAddresses',
  });

  const {
    fields: billingFields,
    append: appendBilling,
    remove: removeBilling,
  } = useFieldArray({
    control,
    name: 'billingAddresses',
  });

  const {
    control: passwordControl,
    handleSubmit: handlePasswordSubmit,
    formState: { isValid: isPasswordValid },
  } = useForm<PasswordChangeInputs>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
    },
    resolver: zodResolver(passwordSchema),
    mode: 'onChange',
  });

  const { showToast } = useToast();
  const { updateToken } = useToken();

  const handlePasswordUpdate = async (data: PasswordChangeInputs) => {
    try {
      const token = localStorage.getItem('customerToken');
      if (!token) {
        throw new Error('No token');
      }

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
      setShowPasswordModal(false);
    } catch (error) {
      console.error(error);
      showToast({ message: 'Changing password error', isError: true });
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <FormInput
            type="text"
            name={'customerData.email'}
            control={control}
            label="Email"
            isDisabled={!isEditable('email')}
          />
          <IconButton onClick={() => enableSection('email')}>
            <EditIcon />
          </IconButton>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button variant="outlined" onClick={() => setShowPasswordModal(true)}>
              Change password
            </Button>
          </div>
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

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <div style={{ width: '45%' }}>
            <Typography variant="h6">Shipping Addresses</Typography>

            {shippingFields.map((field, index) => (
              <div key={field.id} style={{ border: '1px solid yellow', marginBottom: 10, padding: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <CheckBox control={control} name={`shippingAddresses.${index}.isDefault`} label="Set as default" />
                  <div>
                    <IconButton onClick={() => enableSection('shipping')}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => removeShipping(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </div>
                <FormInput
                  name={`shippingAddresses.${index}.streetName`}
                  control={control}
                  label="Street"
                  fullWidth
                  isDisabled={!isEditable('shipping')}
                />
                <FormInput
                  name={`shippingAddresses.${index}.city`}
                  control={control}
                  label="City"
                  fullWidth
                  isDisabled={!isEditable('shipping')}
                />
                <FormInput
                  name={`shippingAddresses.${index}.state`}
                  control={control}
                  label="State"
                  fullWidth
                  isDisabled={!isEditable('shipping')}
                />

                <SelectFormInput
                  name={`shippingAddresses.${index}.country`}
                  control={control}
                  label="Country"
                  isDisabled={!isEditable('shipping')}
                >
                  <MenuItem value="US">USA</MenuItem>
                  <MenuItem value="CN">Canada</MenuItem>
                </SelectFormInput>

                <FormInput
                  name={`shippingAddresses.${index}.postalCode`}
                  control={control}
                  label="Postal Code"
                  fullWidth
                  isDisabled={!isEditable('shipping')}
                />
              </div>
            ))}

            <Button
              style={{ width: 'fit-content', height: 'fit-content', padding: '5px 10px' }}
              onClick={() =>
                appendShipping({
                  streetName: '',
                  city: '',
                  state: '',
                  country: '',
                  postalCode: '',
                  isDefault: false,
                })
              }
            >
              Add shipping address
            </Button>
          </div>

          <div style={{ width: '45%' }}>
            <Typography variant="h6">Billing Addresses</Typography>

            {billingFields.map((field, index) => (
              <div key={field.id} style={{ border: '1px solid yellow', marginBottom: 10, padding: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <CheckBox control={control} name={`billingAddresses.${index}.isDefault`} label="Set as default" />
                  <div>
                    <IconButton onClick={() => enableSection('billing')}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => removeBilling(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </div>
                <FormInput
                  name={`billingAddresses.${index}.streetName`}
                  control={control}
                  label="Street"
                  fullWidth
                  isDisabled={!isEditable('billing')}
                />
                <FormInput
                  name={`billingAddresses.${index}.city`}
                  control={control}
                  label="City"
                  fullWidth
                  isDisabled={!isEditable('billing')}
                />
                <FormInput
                  name={`billingAddresses.${index}.state`}
                  control={control}
                  label="State"
                  fullWidth
                  isDisabled={!isEditable('billing')}
                />

                <SelectFormInput
                  name={`billingAddresses.${index}.country`}
                  control={control}
                  label="Country"
                  isDisabled={!isEditable('billing')}
                >
                  <MenuItem value="US">USA</MenuItem>
                  <MenuItem value="CN">Canada</MenuItem>
                </SelectFormInput>

                <FormInput
                  name={`billingAddresses.${index}.postalCode`}
                  control={control}
                  label="Postal Code"
                  fullWidth
                  isDisabled={!isEditable('billing')}
                />
              </div>
            ))}

            <Button
              style={{ width: 'fit-content', height: 'fit-content', padding: '5px 10px' }}
              onClick={() =>
                appendBilling({
                  streetName: '',
                  city: '',
                  state: '',
                  country: '',
                  postalCode: '',
                  isDefault: false,
                })
              }
            >
              Add billing address
            </Button>
          </div>
        </div>

        {['email', 'personal', 'shipping', 'billing'].some(isEditable) && (
          <Button type="submit" style={{ width: 'fit-content', height: 'fit-content', padding: '5px 10px' }}>
            Save changes
          </Button>
        )}
      </form>

      <Dialog open={showPasswordModal} onClose={() => setShowPasswordModal(false)}>
        <DialogContent style={{ padding: '20px 30px' }}>
          <form onSubmit={handlePasswordSubmit(handlePasswordUpdate)}>
            <Typography variant="h6">Change your password</Typography>

            <FormInput
              type="password"
              label="Current password"
              name="currentPassword"
              control={passwordControl}
              fullWidth
            />
            <FormInput type="password" label="New password" name="newPassword" control={passwordControl} fullWidth />
            <div style={{ textAlign: 'center' }}>
              <Button onClick={() => setShowPasswordModal(false)}>Cancel</Button>
              <Button type="submit" disabled={!isPasswordValid}>
                Save
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
