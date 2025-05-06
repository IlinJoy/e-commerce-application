import { LoginFormUi, type LoginFormInputs } from '@/ui/form/login-form-ui';
import { Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './login-page.module.scss';

export function LoginPage() {
  const [generalError, setGeneralError] = useState('temp Customer account with the given credentials not found');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting }, // заменить на isPending
  } = useForm<LoginFormInputs>({ mode: 'onChange' }); // + валидация resolver: resolver(schema)

  // для вывода ошибок с инпутами, нужны будут еще имена полей, остальные можно посмотреть как сделать чтобы отличать их можно было
  // через TanStack/кастомный?? можно подумать насчет вынести в отдельный файл
  // const { error, mutate, isPending} = useMutation({
  //   mutationFn: interactionWithApi,
  //   onSuccess: auth/redirect,
  //   onError: (err) => handleError(err)
  // });
  // mutationFn: (variables: TVariables) => Promise<TData>;

  const onSubmit = handleSubmit((data: LoginFormInputs) => {
    console.log(data);
  });

  const handleUserTouch = () => {
    if (generalError) {
      setGeneralError('');
    }
  };

  return (
    <div className={styles.loginImage}>
      <Stack className={`${styles.formWrapper} ${generalError ? styles.generalError : ''}`}>
        <Typography variant="h2">Login</Typography>
        <LoginFormUi
          onSubmit={onSubmit}
          register={register}
          errors={errors}
          generalError={generalError}
          handleUserTouch={handleUserTouch}
          isPending={isSubmitting}
          isValidForm={isValid}
        />
      </Stack>
      {/* TO DO replace */}
      {generalError && <Typography className={styles.generalErrorMessage}>{generalError}</Typography>}
    </div>
  );
}
