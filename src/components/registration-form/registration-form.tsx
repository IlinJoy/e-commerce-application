/* eslint-disable no-restricted-imports */
import { useEffect, type BaseSyntheticEvent } from 'react';
import type { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { FormInput } from '../input/input';
import type { RegisterFormInputs } from '@/validation/registration-validation';
import { Button, Checkbox, FormControlLabel, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import styles from './registration-form.module.scss';

type RegisterFormProps = {
  onSubmit: (e?: BaseSyntheticEvent<object>) => Promise<void>;
  register: UseFormRegister<RegisterFormInputs>;
  errors: FieldErrors<RegisterFormInputs>;
  isSubmitting: boolean;
  isValidForm: boolean;
  watch: UseFormWatch<RegisterFormInputs>;
  setValue: UseFormSetValue<RegisterFormInputs>;
};

export function RegisterForm({
  onSubmit,
  register,
  errors,
  isSubmitting,
  isValidForm,
  watch,
  setValue,
}: RegisterFormProps) {
  const shippingCountry = watch('shippingCountry');
  const billingCountry = watch('billingCountry');
  const sameAddress = watch('sameAddress');

  useEffect(() => {
    if (shippingCountry === 'USA') {
      setValue('shippingCanadianCode', '');
      setValue('shippingPostalCode', '');
    } else if (shippingCountry === 'Canada') {
      setValue('shippingUSACode', '');
      setValue('shippingPostalCode', '');
    } else {
      setValue('shippingUSACode', '');
      setValue('shippingCanadianCode', '');
    }
  }, [shippingCountry, setValue]);

  useEffect(() => {
    if (billingCountry === 'USA') {
      setValue('billingCanadianCode', '');
      setValue('billingPostalCode', '');
    } else if (billingCountry === 'Canada') {
      setValue('billingUSACode', '');
      setValue('billingPostalCode', '');
    } else {
      setValue('billingUSACode', '');
      setValue('billingCanadianCode', '');
    }
  }, [billingCountry, setValue]);

  useEffect(() => {
    if (sameAddress) {
      setValue('billingStreet', watch('shippingStreet'));
      setValue('billingCity', watch('shippingCity'));
      setValue('billingCountry', watch('shippingCountry'));

      if (shippingCountry === 'USA') {
        setValue('billingUSACode', watch('shippingUSACode'));
        setValue('billingCanadianCode', '');
        setValue('billingPostalCode', '');
      } else if (shippingCountry === 'Canada') {
        setValue('billingCanadianCode', watch('shippingCanadianCode'));
        setValue('billingUSACode', '');
        setValue('billingPostalCode', '');
      } else {
        setValue('billingPostalCode', watch('shippingPostalCode'));
        setValue('billingUSACode', '');
        setValue('billingCanadianCode', '');
      }
    }
  }, [sameAddress, watch, shippingCountry, setValue]);

  return (
    <form onSubmit={onSubmit}>
      <div className={styles.personalInfo}>
        <Typography variant="h6">Personal Info</Typography>
        <FormInput
          type="email"
          label="Email"
          isDisabled={isSubmitting}
          register={register}
          name="email"
          id="email"
          error={errors.email?.message}
        />
        <FormInput
          type={'password'}
          label="Password"
          isDisabled={isSubmitting}
          register={register}
          name="password"
          id="password"
          error={errors.password?.message}
        />
        <FormInput
          type={'text'}
          label="First Name"
          isDisabled={isSubmitting}
          register={register}
          name="firstName"
          id="firstName"
          error={errors.firstName?.message}
        />
        <FormInput
          type={'text'}
          label="Last Name"
          isDisabled={isSubmitting}
          register={register}
          name="lastName"
          id="lastName"
          error={errors.lastName?.message}
        />
        <FormInput
          type={'date'}
          label="Date of Birth"
          isDisabled={isSubmitting}
          register={register}
          name="dateOfBirth"
          id="dateOfBirth"
          error={errors.dateOfBirth?.message}
        />
      </div>

      <div className={styles.shippingAdress}>
        <Typography variant="h6">Shipping Address</Typography>
        <FormInput
          type={'text'}
          label="Street"
          isDisabled={isSubmitting}
          register={register}
          name="shippingStreet"
          id="shippingStreet"
          error={errors.shippingStreet?.message}
        />
        <FormInput
          type={'text'}
          label="City"
          isDisabled={isSubmitting}
          register={register}
          name="shippingCity"
          id="shippingCity"
          error={errors.shippingCity?.message}
        />
        <InputLabel>Country</InputLabel>
        <Select defaultValue="" {...register('shippingCountry')} disabled={isSubmitting}>
          <MenuItem value="USA">USA</MenuItem>
          <MenuItem value="Canada">Canada</MenuItem>
        </Select>
        <FormInput
          type={'text'}
          label="Postal Code"
          isDisabled={isSubmitting}
          register={register}
          name={
            shippingCountry === 'USA'
              ? 'shippingUSACode'
              : shippingCountry === 'Canada'
                ? 'shippingCanadianCode'
                : 'shippingPostalCode'
          }
          id="shippingPostalCode"
          error={
            shippingCountry === 'USA'
              ? errors.shippingUSACode?.message
              : shippingCountry === 'Canada'
                ? errors.shippingCanadianCode?.message
                : errors.shippingPostalCode?.message
          }
        />
        <FormControlLabel control={<Checkbox defaultChecked />} label="Set as default address" />
        <FormControlLabel
          control={<Checkbox {...register('sameAddress')} />}
          label="Use the same address for both billing and shipping"
        />
      </div>

      <div className={styles.billingAdress}>
        <Typography variant="h6">Billing Address</Typography>
        <FormInput
          type={'text'}
          label="Street"
          isDisabled={sameAddress}
          register={register}
          name="billingStreet"
          id="billingStreet"
          error={errors.billingStreet?.message}
        />
        <FormInput
          type={'text'}
          label="City"
          isDisabled={sameAddress}
          register={register}
          name="billingCity"
          id="billingCity"
          error={errors.billingCity?.message}
        />
        <InputLabel>Country</InputLabel>
        <Select defaultValue="" {...register('billingCountry')} disabled={isSubmitting || sameAddress}>
          <MenuItem value="USA">USA</MenuItem>
          <MenuItem value="Canada">Canada</MenuItem>
        </Select>
        <FormInput
          type={'text'}
          label="Postal Code"
          isDisabled={sameAddress}
          register={register}
          name={
            billingCountry === 'USA'
              ? 'billingUSACode'
              : billingCountry === 'Canada'
                ? 'billingCanadianCode'
                : 'billingPostalCode'
          }
          id="billingPostalCode"
          error={
            billingCountry === 'USA'
              ? errors.billingUSACode?.message
              : billingCountry === 'Canada'
                ? errors.billingCanadianCode?.message
                : errors.billingPostalCode?.message
          }
        />
        <FormControlLabel control={<Checkbox defaultChecked />} label="Set as default address" />
        <Button type="submit" disabled={!isValidForm} loading={isSubmitting}>
          Register
        </Button>
      </div>
    </form>
  );
}
