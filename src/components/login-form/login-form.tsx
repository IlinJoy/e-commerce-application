import { useState } from 'react';
import type { LoginFormUiProps } from '@/ui/form/login-form-ui';
import { LoginFormUi } from '@/ui/form/login-form-ui';

type LoginFormProps = Omit<LoginFormUiProps, 'handleClickShowPassword' | 'showPassword'>;

export function LoginForm(props: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const { onSubmit, register, errors, generalError, handleUserTouch, isPending, isValidForm } = props;
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <LoginFormUi
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      generalError={generalError}
      handleUserTouch={handleUserTouch}
      isPending={isPending}
      isValidForm={isValidForm}
      handleClickShowPassword={handleClickShowPassword}
      showPassword={showPassword}
    />
  );
}
