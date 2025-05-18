/* eslint-disable no-restricted-imports */
import { useEffect, type BaseSyntheticEvent, type ChangeEvent, useState } from 'react';
import type { UseFormResetField } from 'react-hook-form';
import { type UseFormSetValue, type Control, useWatch } from 'react-hook-form';
import { FormInput } from '../input/input';
import type { RegisterFormInputs } from '@/validation/registration-validation';
import { Button, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { AddressForm } from './address-form';
import styles from './registration-form.module.scss';

type RegisterFormProps = {
  onSubmit: (e?: BaseSyntheticEvent<object>) => Promise<void>;
  setValue: UseFormSetValue<RegisterFormInputs>;
  isSubmitting: boolean;
  isValidForm: boolean;
  control: Control<RegisterFormInputs>;
  resetField: UseFormResetField<RegisterFormInputs>;
};

export function RegisterForm({
  onSubmit,
  isSubmitting,
  isValidForm,
  setValue,
  control,
  resetField,
}: RegisterFormProps) {
  //чтобы при смене страны поле с кодом очищалось
  const [shippingCountry, billingCountry] = useWatch({
    control,
    name: ['shippingCountry', 'billingCountry'],
  });

  useEffect(() => {
    resetField('shippingPostalCode');
  }, [shippingCountry, resetField]);

  useEffect(() => {
    resetField('billingPostalCode');
  }, [billingCountry, resetField]);

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
        <AddressForm prefix="shipping" title="Shipping Address" control={control} isDisabled={isSubmitting} />
        <FormControlLabel
          control={<Checkbox onClick={handleSameAddressChecked} />}
          label="Use the same address for both billing and shipping"
        />
      </div>

      <div className={styles.billingAddress}>
        <AddressForm
          prefix="billing"
          title="Billing Address"
          control={control}
          isDisabled={sameAddress || isSubmitting}
        />
      </div>

      <Button className={styles.registerBtn} type="submit" disabled={!isValidForm} loading={isSubmitting}>
        Register
      </Button>
    </form>
  );
}
