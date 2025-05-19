import { useEffect, type BaseSyntheticEvent, useState } from 'react';
import type { UseFormResetField } from 'react-hook-form';
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
  const [sameAddress, setIsSameAddress] = useState(false);
  const watchedValues = useWatch({
    control,
    name: ['shippingPostalCode', 'shippingCountry', 'shippingCity', 'shippingStreet'],
  });

  useEffect(() => {
    if (!sameAddress) {
      resetField('billingPostalCode');
      resetField('billingCountry');
      resetField('billingCity');
      resetField('billingStreet');
    }
    if (sameAddress) {
      const [code, country, city, street] = watchedValues;

      setValue('billingPostalCode', code, { shouldValidate: true });
      setValue('billingCountry', country, { shouldValidate: true });
      setValue('billingCity', city, { shouldValidate: true });
      setValue('billingStreet', street, { shouldValidate: true });
    }
  }, [sameAddress, resetField, watchedValues, setValue]);

  const handleSameAddressChecked = () => setIsSameAddress((prev) => !prev);

  //чтобы при смене страны поле с кодом очищалось
  const [shippingCountry, billingCountry] = useWatch({
    control,
    name: ['shippingCountry', 'billingCountry'],
  });

  useEffect(() => {
    resetField('shippingPostalCode');
  }, [shippingCountry, resetField]);

  useEffect(() => {
    if (!sameAddress) {
      resetField('billingPostalCode');
    }
  }, [sameAddress, billingCountry, resetField]);

  return (
    <form onSubmit={onSubmit}>
      <div className={styles.personalInfo}>
        <Typography variant="h6">Personal Info</Typography>
        <FormInput type="email" label="Email" isDisabled={isSubmitting} name="email" control={control} />
        <FormInput type={'password'} label="Password" isDisabled={isSubmitting} name="password" control={control} />
        <FormInput type={'text'} label="First Name" isDisabled={isSubmitting} name="firstName" control={control} />
        <FormInput type={'text'} label="Last Name" isDisabled={isSubmitting} name="lastName" control={control} />
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
        <CheckBox
          onClick={handleSameAddressChecked}
          control={control}
          name="sameAddress"
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
