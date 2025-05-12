import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import type { Dispatch, SetStateAction } from 'react';

type PasswordButtonProps = {
  setShowPassword: Dispatch<SetStateAction<boolean>>;
  showPassword: boolean;
};

export function PasswordButton({ setShowPassword, showPassword }: PasswordButtonProps) {
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return <IconButton onClick={handleClickShowPassword}>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton>;
}
