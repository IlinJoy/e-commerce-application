import type { LoginFormUiProps } from '@/ui/form/login-form-ui';
import { LoginFormUi } from '@/ui/form/login-form-ui';
import type { Dispatch } from 'react';

type LoginFormProps = Omit<LoginFormUiProps, 'handleUserTouch'> & {
  setGeneralError: Dispatch<React.SetStateAction<string>>;
};

export function LoginForm(props: LoginFormProps) {
  const { onSubmit, register, errors, setGeneralError, generalError, isPending, isValidForm } = props;

  const handleUserTouch = () => {
    if (generalError) {
      setGeneralError('');
    }
  };

  return (
    <LoginFormUi
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      generalError={generalError}
      handleUserTouch={handleUserTouch}
      isPending={isPending}
      isValidForm={isValidForm}
    />
  );
}
