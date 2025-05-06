import type { BaseSyntheticEvent } from 'react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import { LoginFormUi, type LoginFormInputs } from '../form/login-form-ui';
import { Stack, Typography } from '@mui/material';
import styles from './login-page-ui.module.scss';

type LoginPageUiProps = {
  onSubmit: (e?: BaseSyntheticEvent<object>) => Promise<void>;
  register: UseFormRegister<LoginFormInputs>;
  errors: FieldErrors<LoginFormInputs>;
  generalError: string;
  handleUserTouch: () => void;
  isPending: boolean;
  isValidForm: boolean;
};

export function LoginPageUi(props: LoginPageUiProps) {
  const { onSubmit, register, errors, generalError, handleUserTouch, isPending, isValidForm } = props;

  return (
    <div>
      <div className={styles.loginImage}>
        <Stack className={styles.formWrapper}>
          <Typography variant="h2">Login</Typography>
          <LoginFormUi
            onSubmit={onSubmit}
            register={register}
            errors={errors}
            generalError={generalError}
            handleUserTouch={handleUserTouch}
            isPending={isPending}
            isValidForm={isValidForm}
          />
          {generalError && <Typography>{generalError}</Typography>}
          {/* <AlreadyHaveAcc></AlreadyHaveAcc> */}
        </Stack>
      </div>
    </div>
  );
}
