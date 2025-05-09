import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import type { Dispatch, SetStateAction } from 'react';

type PasswordButtonProps = {
  setShowPassword: Dispatch<SetStateAction<boolean>>;
  showPassword: boolean;
};

export function PasswordButton({ setShowPassword, showPassword }: PasswordButtonProps) {
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return <IconButton onClick={handleClickShowPassword}>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton>;
}
