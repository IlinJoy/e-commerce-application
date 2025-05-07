import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel } from '@mui/material';
import { useState } from 'react';
import type { UseFormRegister } from 'react-hook-form';
import type { LoginFormInputs } from '../form/login-form-ui';

type PasswordInputProps = {
  isPending: boolean;
  register: UseFormRegister<LoginFormInputs>;
  error: string | undefined;
  generalError: string;
};

export function PasswordInput({ isPending, error, register, generalError }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <FormControl variant="standard">
      <InputLabel required error={!!error || !!generalError} htmlFor="password">
        Password
      </InputLabel>
      <Input
        {...register('password', { required: 'Required', minLength: { value: 5, message: 'placeholder' } })}
        type={showPassword ? 'text' : 'password'}
        disabled={isPending}
        error={!!error || !!generalError}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={handleClickShowPassword}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      {error && <FormHelperText error>{error}</FormHelperText>}
    </FormControl>
  );
}
