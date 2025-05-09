import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel } from '@mui/material';
import { useState } from 'react';
import type { FieldValues, Path, UseFormRegister } from 'react-hook-form';

type PasswordInputProps<T extends FieldValues> = {
  disabled?: boolean;
  register: UseFormRegister<T>;
  name: Path<T>;
  error?: string;
  generalError?: string;
};

export function PasswordInput<T extends FieldValues>({
  disabled: isDisabled,
  error,
  name,
  register,
  generalError,
}: PasswordInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <FormControl variant="standard">
      <InputLabel required error={!!error || !!generalError} htmlFor="password">
        Password
      </InputLabel>
      <Input
        {...register(name, { required: 'Required', minLength: { value: 5, message: 'placeholder' } })}
        type={showPassword ? 'text' : 'password'}
        disabled={isDisabled}
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
