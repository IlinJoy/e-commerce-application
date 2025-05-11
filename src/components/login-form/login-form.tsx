/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button } from '@mui/material';
import type { BaseSyntheticEvent } from 'react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormInput } from '../input/input';
import styles from './login-form.module.scss';

type LoginFormProps = {
  onSubmit: (e?: BaseSyntheticEvent<object>) => Promise<void>;
  register: UseFormRegister<LoginFormInputs>;
  errors: FieldErrors<LoginFormInputs>;
  isSubmitting: boolean;
  isValidForm: boolean;
};

export type LoginFormInputs = {
  email: string;
  password: string;
};

export function LoginForm({ onSubmit, register, errors, isSubmitting, isValidForm }: LoginFormProps) {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <FormInput
        type={'email'}
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
      <Button type="submit" disabled={!isValidForm} loading={isSubmitting}>
        Submit
      </Button>
    </form>
  );
}
