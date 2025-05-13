import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import type { ReactNode } from 'react';
import { useState } from 'react';
import type { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { PasswordButton } from './ui/password-button';

type FormInputProps<T extends FieldValues> = {
  type: 'text' | 'password' | 'email' | 'date';
  register: UseFormRegister<T>;
  name: Path<T>;
  value?: string;
  label?: string;
  error?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  endAdornment?: ReactNode;
};

export function FormInput<T extends FieldValues>({
  type = 'text',
  isRequired = true,
  register,
  name,
  value,
  label,
  error,
  isDisabled,
  endAdornment,
}: FormInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormControl>
      {label && (
        <InputLabel required={isRequired} error={!!error} htmlFor={name}>
          {label}
        </InputLabel>
      )}
      <Input
        value={value}
        {...register(name, { required: isRequired && 'Required', minLength: { value: 2, message: 'placeholder' } })}
        type={showPassword ? 'text' : type}
        disabled={isDisabled}
        error={!!error}
        endAdornment={
          <InputAdornment position="end">
            {type === 'password' && <PasswordButton showPassword={showPassword} setShowPassword={setShowPassword} />}
            {endAdornment}
          </InputAdornment>
        }
      />
      {error && <FormHelperText error>{error}</FormHelperText>}
    </FormControl>
  );
}
