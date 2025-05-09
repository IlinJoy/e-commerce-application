/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button, TextField } from '@mui/material';
import type { BaseSyntheticEvent, Dispatch, SetStateAction } from 'react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import { PasswordInput } from '../input/password-input';
import styles from './login-form.module.scss';

type LoginFormProps = {
  onSubmit: (e?: BaseSyntheticEvent<object>) => Promise<void>;
  register: UseFormRegister<LoginFormInputs>;
  errors: FieldErrors<LoginFormInputs>;
  generalError: string;
  setGeneralError: Dispatch<SetStateAction<string>>;
  isSubmitting: boolean;
  isValidForm: boolean;
};

export type LoginFormInputs = {
  email: string;
  password: string;
};

export function LoginForm({
  onSubmit,
  register,
  errors,
  setGeneralError,
  generalError,
  isSubmitting,
  isValidForm,
}: LoginFormProps) {
  const handleUserTouch = () => {
    if (generalError) {
      setGeneralError('');
    }
  };

  return (
    <form onSubmit={onSubmit} onChange={handleUserTouch} className={styles.form}>
      <TextField
        label="Email"
        required
        {...register('email', { required: 'Required' })}
        variant="standard"
        disabled={isSubmitting}
        error={!!errors.email || !!generalError}
        helperText={errors.email?.message}
      />
      <PasswordInput
        disabled={isSubmitting}
        register={register}
        name="password"
        error={errors.password?.message}
        generalError={generalError}
      />
      <Button type="submit" disabled={!isValidForm} loading={isSubmitting}>
        Submit
      </Button>
    </form>
  );
}
