/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button, TextField } from '@mui/material';
import type { BaseSyntheticEvent } from 'react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import styles from './login-form-ui.module.scss';
import { PasswordInput } from '../input/password-input';

export type LoginFormUiProps = {
  onSubmit: (e?: BaseSyntheticEvent<object>) => Promise<void>;
  register: UseFormRegister<LoginFormInputs>;
  errors: FieldErrors<LoginFormInputs>;
  generalError: string;
  handleUserTouch: () => void;
  isPending: boolean;
  isValidForm: boolean;
};

export type LoginFormInputs = {
  email: string;
  password: string;
};

export function LoginFormUi(props: LoginFormUiProps) {
  const { onSubmit, register, errors, generalError, handleUserTouch, isPending, isValidForm } = props;

  return (
    <form onSubmit={onSubmit} onChange={handleUserTouch} className={styles.form}>
      <TextField
        label="Email"
        required
        {...register('email', { required: 'Required' })}
        variant="standard"
        disabled={isPending}
        error={!!errors.email || !!generalError}
        helperText={errors.email?.message}
      />
      <PasswordInput
        isPending={isPending}
        register={register}
        error={errors.password?.message}
        generalError={generalError}
      />
      <Button type="submit" disabled={!isValidForm} loading={isPending}>
        Submit
      </Button>
    </form>
  );
}
