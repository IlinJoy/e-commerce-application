import Button from '@mui/material/Button';
import type { BaseSyntheticEvent } from 'react';
import type { Control, FieldErrors } from 'react-hook-form';
import { FormInput } from '../input/input';
import styles from './login-form.module.scss';

type LoginFormProps = {
  onSubmit: (e?: BaseSyntheticEvent<object>) => Promise<void>;
  control: Control<LoginFormInputs>;
  errors: FieldErrors<LoginFormInputs>;
  isSubmitting: boolean;
  isValidForm: boolean;
};

export type LoginFormInputs = {
  email: string;
  password: string;
};

export function LoginForm({ onSubmit, control, errors, isSubmitting, isValidForm }: LoginFormProps) {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <FormInput
        type="text"
        label="Email"
        isDisabled={isSubmitting}
        name="email"
        control={control}
        error={errors.email?.message}
      />
      <FormInput
        type={'password'}
        label="Password"
        isDisabled={isSubmitting}
        name="password"
        control={control}
        error={errors.password?.message}
      />
      <Button type="submit" disabled={!isValidForm} loading={isSubmitting}>
        Submit
      </Button>
    </form>
  );
}
