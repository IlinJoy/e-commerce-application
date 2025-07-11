import { useEffect, type BaseSyntheticEvent, useState, useRef } from 'react';
import type { UseFormClearErrors, UseFormResetField, UseFormTrigger } from 'react-hook-form';
import { type UseFormSetValue, type Control, useWatch } from 'react-hook-form';
import { FormInput } from '../input/input';
import type { RegisterFormInputs } from '@/validation/registration-validation';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { AddressForm } from './address-form';
import styles from './registration-form.module.scss';
import { CheckBox } from '../checkbox/checkbox';

type RegisterFormProps = {
  onSubmit: (e?: BaseSyntheticEvent<object>) => Promise<void>;
  setValue: UseFormSetValue<RegisterFormInputs>;
  isSubmitting: boolean;
  isValidForm: boolean;
  control: Control<RegisterFormInputs>;
  trigger: UseFormTrigger<RegisterFormInputs>;
  resetField: UseFormResetField<RegisterFormInputs>;
  clearErrors: UseFormClearErrors<RegisterFormInputs>;
};

export function RegisterForm({
  onSubmit,
  isSubmitting,
  isValidForm,
  setValue,
  control,
  trigger,
  clearErrors,
  resetField,
}: RegisterFormProps) {
  const [sameAddress, setSameAddress] = useState(false);
  const [billingCountry, shippingCountry] = useWatch({
    control,
    name: ['billingAddress.country', 'shippingAddress.country'],
  });
  const [shippingAddress] = useWatch({ control, name: ['shippingAddress'] });
  const shouldReset = useRef(true);

  useEffect(() => {
    if (sameAddress) {
      setValue('billingAddress', shippingAddress, { shouldValidate: true });
    }
  }, [sameAddress, resetField, setValue, shippingAddress]);

  useEffect(() => {
    if (shouldReset.current) {
      resetField('shippingAddress.postalCode');
    }
    if (sameAddress) {
      trigger('shippingAddress.postalCode');
    }
    shouldReset.current = true;
  }, [shippingCountry, sameAddress, resetField, trigger]);

  useEffect(() => {
    resetField('billingAddress.postalCode');
    clearErrors('billingAddress.postalCode');
  }, [billingCountry, resetField, clearErrors]);

  const handleSameAddressChecked = () => {
    if (!sameAddress) {
      trigger(['shippingAddress']);
    } else {
      resetField('billingAddress');
      (Object.keys(shippingAddress) as (keyof typeof shippingAddress)[]).forEach((key) => {
        if (shippingAddress[key] === '') {
          clearErrors(`shippingAddress.${key}`);
        }
      });
    }
    shouldReset.current = false;
    setSameAddress((prev) => !prev);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className={styles.personalInfo}>
        <Typography variant="h6">Personal Info</Typography>
        <FormInput type="email" label="Email" isDisabled={isSubmitting} name="customerData.email" control={control} />
        <FormInput
          type="password"
          label="Password"
          isDisabled={isSubmitting}
          name="customerData.password"
          control={control}
        />
        <FormInput
          type="text"
          label="First Name"
          isDisabled={isSubmitting}
          name="customerData.firstName"
          control={control}
        />
        <FormInput
          type="text"
          label="Last Name"
          isDisabled={isSubmitting}
          name="customerData.lastName"
          control={control}
        />
        <FormInput
          type="date"
          label="Date of Birth"
          isDisabled={isSubmitting}
          name="customerData.dateOfBirth"
          control={control}
          shrinkLabel
        />
      </div>

      <div className={styles.shippingAddress}>
        <AddressForm prefix="shippingAddress" title="Shipping Address" control={control} isDisabled={isSubmitting} />
        <CheckBox
          onClick={handleSameAddressChecked}
          control={control}
          name="sameAddress"
          label="Use the same address for both billing and shipping"
          className={styles.sameAddress}
        />
      </div>

      <div className={styles.billingAddress}>
        <AddressForm
          prefix="billingAddress"
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
