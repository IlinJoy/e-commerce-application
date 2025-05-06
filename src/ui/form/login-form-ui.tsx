/* eslint-disable @typescript-eslint/no-misused-promises */
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, IconButton, TextField } from '@mui/material';
import type { BaseSyntheticEvent } from 'react';
import { useState } from 'react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import styles from './login-form-ui.module.scss';

type LoginFormUiProps = {
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
  const [showPassword, setShowPassword] = useState(false);

  const { onSubmit, register, errors, generalError, handleUserTouch, isPending, isValidForm } = props;
  const handleClickShowPassword = () => setShowPassword((show) => !show);

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
      <div className={styles.inputWrapper}>
        <TextField
          label="Password"
          required
          {...register('password', { required: 'Required', minLength: { value: 5, message: 'placeholder' } })}
          type={showPassword ? 'text' : 'password'}
          variant="standard"
          disabled={isPending}
          error={!!errors.password || !!generalError}
          helperText={errors.password?.message}
        />
        <IconButton size="small" onClick={handleClickShowPassword}>
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </div>
      <Button type="submit" disabled={!isValidForm} loading={isPending}>
        Submit
      </Button>
    </form>
  );
}
