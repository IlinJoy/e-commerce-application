import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { useController, type FieldValues } from 'react-hook-form';
import { PasswordButton } from './ui/password-button';
import type { FormSelectProps } from '../select/select';

type FormInputProps<T extends FieldValues> = Omit<FormSelectProps<T>, 'children'> & {
  type?: 'text' | 'password' | 'email' | 'date';
  placeholder?: string;
  endAdornment?: ReactNode;
  shrinkLabel?: boolean;
  fullWidth?: boolean;
  ariaLabel?: string;
};

export function FormInput<T extends FieldValues>({
  type = 'text',
  isRequired = true,
  name,
  label,
  placeholder,
  isDisabled,
  control,
  endAdornment,
  shrinkLabel,
  fullWidth,
  ariaLabel,
}: FormInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  const shouldShrink = !!field.value || shrinkLabel;

  return (
    <FormControl error={!!error} fullWidth={fullWidth}>
      {label && (
        <InputLabel {...(shouldShrink && { shrink: true })} required={isRequired} htmlFor={name}>
          {label}
        </InputLabel>
      )}
      <Input
        {...field}
        id={name}
        type={showPassword ? 'text' : type}
        placeholder={placeholder}
        disabled={isDisabled}
        inputProps={{
          'aria-label': ariaLabel,
          autoComplete: type === 'password' ? 'password' : 'current-password',
        }}
        endAdornment={
          <InputAdornment position="end">
            {type === 'password' && <PasswordButton showPassword={showPassword} setShowPassword={setShowPassword} />}
            {endAdornment}
          </InputAdornment>
        }
      />
      {error && <FormHelperText error>{error.message}</FormHelperText>}
    </FormControl>
  );
}
