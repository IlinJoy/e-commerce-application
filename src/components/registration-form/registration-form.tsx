/* eslint-disable no-restricted-imports */
import { useEffect, type BaseSyntheticEvent, type ChangeEvent, useState } from 'react';
import { type UseFormSetValue, type Control, useWatch } from 'react-hook-form';
import { FormInput } from '../input/input';
import type { RegisterFormInputs } from '@/validation/registration-validation';
import { Button, Checkbox, FormControlLabel, MenuItem, Typography } from '@mui/material';
import styles from './registration-form.module.scss';
import { SelectFormInput } from '../select/select';

type RegisterFormProps = {
  onSubmit: (e?: BaseSyntheticEvent<object>) => Promise<void>;
  setValue: UseFormSetValue<RegisterFormInputs>;
  isSubmitting: boolean;
  isValidForm: boolean;
  control: Control<RegisterFormInputs>;
};

export function RegisterForm({ onSubmit, isSubmitting, isValidForm, setValue, control }: RegisterFormProps) {
  //чтобы при смене страны поле с кодом очищалось
  const [shippingCountry, billingCountry] = useWatch({
    control,
    name: ['shippingCountry', 'billingCountry'],
  });

  useEffect(() => {
    setValue('shippingPostalCode', '');
  }, [shippingCountry, setValue]);

  useEffect(() => {
    setValue('billingPostalCode', '');
  }, [billingCountry, setValue]);

  //для установки того же адреса для оплаты
  const [sameAddress, setIsSameAddress] = useState(false);
  const watchedValues = useWatch({
    control,
    name: ['shippingPostalCode', 'shippingCountry', 'shippingCity', 'shippingStreet'],
  });

  useEffect(() => {
    if (!sameAddress) {
      return;
    }

    const [code, country, city, street] = watchedValues;

    setValue('billingStreet', street, { shouldValidate: !!street });
    setValue('billingCity', city, { shouldValidate: !!city });
    setValue('billingCountry', country, { shouldValidate: !!country });
    setValue('billingPostalCode', code, { shouldValidate: !!code });
  }, [sameAddress, watchedValues, setValue]);

  const handleSameAddressChecked = () => {
    handleChecked('sameAddress');
    setIsSameAddress((prev) => !prev);
  };

  const handleChecked = (fieldName: keyof RegisterFormInputs) => (event: ChangeEvent<HTMLInputElement>) => {
    setValue(fieldName, event.target.checked);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className={styles.personalInfo}>
        <Typography variant="h6">Personal Info</Typography>
        <FormInput
          type="email"
          label="Email"
          isDisabled={isSubmitting}
          name="email"
          control={control}
          shrinkLabel={true}
        />
        <FormInput
          type={'password'}
          label="Password"
          isDisabled={isSubmitting}
          name="password"
          control={control}
          shrinkLabel={true}
        />
        <FormInput
          type={'text'}
          label="First Name"
          isDisabled={isSubmitting}
          name="firstName"
          control={control}
          shrinkLabel={true}
        />
        <FormInput
          type={'text'}
          label="Last Name"
          isDisabled={isSubmitting}
          name="lastName"
          control={control}
          shrinkLabel={true}
        />
        <FormInput
          type={'date'}
          label="Date of Birth"
          isDisabled={isSubmitting}
          name="dateOfBirth"
          control={control}
          shrinkLabel={true}
        />
      </div>

      <div className={styles.shippingAddress}>
        <Typography variant="h6">Shipping Address</Typography>
        <FormInput name={'shippingStreet'} control={control} label="Street" isDisabled={isSubmitting} />
        <FormInput name={'shippingCity'} control={control} label="City" isDisabled={isSubmitting} />
        <SelectFormInput control={control} name="shippingCountry" label="Country" isDisabled={isSubmitting}>
          <MenuItem value="USA">USA</MenuItem>
          <MenuItem value="Canada">Canada</MenuItem>
        </SelectFormInput>
        <FormInput name={'shippingPostalCode'} control={control} label="Postal Code" isDisabled={isSubmitting} />
        <FormControlLabel control={<Checkbox defaultChecked />} label="Set as default address" />
        <FormControlLabel
          control={<Checkbox onClick={handleSameAddressChecked} />}
          label="Use the same address for both billing and shipping"
        />
      </div>

      <div className={styles.billingAddress}>
        <Typography variant="h6">Billing Address</Typography>
        <FormInput name={'billingStreet'} control={control} label="Street" isDisabled={sameAddress || isSubmitting} />
        <FormInput name={'billingCity'} control={control} label="City" isDisabled={sameAddress || isSubmitting} />
        <SelectFormInput
          name="billingCountry"
          control={control}
          label="Country"
          isDisabled={sameAddress || isSubmitting}
        >
          <MenuItem value="USA">USA</MenuItem>
          <MenuItem value="Canada">Canada</MenuItem>
        </SelectFormInput>
        <FormInput
          name={'billingPostalCode'}
          control={control}
          label="Postal Code"
          isDisabled={sameAddress || isSubmitting}
        />
        <FormControlLabel control={<Checkbox />} label="Set as default address" />
        <Button type="submit" disabled={!isValidForm} loading={isSubmitting}>
          Register
        </Button>
      </div>
    </form>
  );
}
